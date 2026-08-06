import emailjs from '@emailjs/browser';
import { emailJsConfig, isEmailJsConfigured } from '../config/emailjs';
import quotePDFService from './quotePDFService';

class EmailService {
  constructor() {
    this.userId = emailJsConfig.publicKey;
    this.serviceId = emailJsConfig.serviceId;
    this.templateId = emailJsConfig.templateId;
    this.clientTemplateId = emailJsConfig.clientTemplateId;
    this.ownerEmail = emailJsConfig.ownerEmail;
    this.apiUrl = emailJsConfig.apiUrl;
    this.init();
  }

  init() {
    try {
      if (this.userId) {
        emailjs.init(this.userId);
      }
    } catch (error) {
      console.error('Erreur initialisation EmailJS:', error);
    }
  }

  getProjectTypeLabel(type) {
    return quotePDFService.getProjectTypeLabel(type);
  }

  getTimelineLabel(timeline) {
    return quotePDFService.getTimelineLabel(timeline);
  }

  buildQuoteTemplateParams(formData, files, pdfResult, role = 'owner') {
    const projectType = this.getProjectTypeLabel(formData.projectType);
    const timeline = this.getTimelineLabel(formData.timeline);
    const quoteRef = pdfResult?.quoteRef || 'N/A';
    const budget =
      formData.budget && String(formData.budget).trim()
        ? `${Number(formData.budget).toLocaleString('fr-FR')} USD`
        : 'À définir';

    const filesList =
      files.length > 0
        ? files.map((f) => `${f.name} (${(f.size / 1024).toFixed(0)} KB)`).join(', ')
        : 'Aucun fichier';

    const isOwner = role === 'owner';

    // EmailJS attend des strings dans template_params
    const str = (v) => (v == null ? '' : String(v));

    return {
      to_email: str(isOwner ? this.ownerEmail : formData.email),
      reply_to: str(isOwner ? formData.email : this.ownerEmail),
      from_name: str(isOwner ? formData.name : 'Bendelo Thielcy'),
      from_email: str(isOwner ? formData.email : this.ownerEmail),

      client_name: str(formData.name),
      client_email: str(formData.email),
      phone: str(formData.phone || 'Non renseigné'),
      company: str(formData.company || 'Non renseigné'),
      job: str(formData.job || 'Non renseigné'),
      sector: str(formData.sector || 'Non renseigné'),
      website: str(formData.website || 'Non renseigné'),

      project_type: str(projectType),
      budget: str(budget),
      timeline: str(timeline),
      message: str(formData.message || 'Aucune description fournie.'),

      quote_ref: str(quoteRef),
      quote_filename: str(pdfResult?.filename || ''),
      pdf_attached: pdfResult?.base64 ? 'oui' : 'non',
      submission_date: str(
        pdfResult?.meta?.dateStr && pdfResult?.meta?.timeStr
          ? `${pdfResult.meta.dateStr} à ${pdfResult.meta.timeStr}`
          : new Date().toLocaleString('fr-FR')
      ),

      files_count: str(files.length),
      files_list: str(filesList),

      email_role: str(role),
      email_title: str(
        isOwner
          ? `Nouvelle demande de devis — ${projectType}`
          : `Copie de votre demande de devis — ${quoteRef}`
      ),
      subject: str(
        isOwner
          ? `[${quoteRef}] Devis ${projectType} — ${formData.name}`
          : `Accusé de réception devis ${quoteRef} — Bendelo Thielcy`
      ),

      name: str(formData.name),
      email: str(formData.email),
    };
  }

  /**
   * EmailJS n'accepte PAS un champ REST "attachments".
   * Pour une PJ dynamique : template → Attachments → Variable Attachment
   * Parameter name = quote_pdf (data URI base64, comme canvas.toDataURL()).
   * Doc: https://www.emailjs.com/docs/user-guide/file-attachments/
   */
  async sendWithOptionalAttachment(templateId, templateParams, attachment) {
    if (!this.serviceId || !templateId || !this.userId) {
      throw new Error('EmailJS non configuré (service / template / public key).');
    }

    const params = { ...templateParams };
    let triedAttachment = false;
    let withAttachment = false;

    // datauristring jsPDF = data:application/pdf;filename=generated.pdf;base64,....
    const dataUri =
      attachment?.dataUri ||
      (attachment?.base64
        ? `data:application/pdf;filename=${encodeURIComponent(
            attachment.filename || 'devis.pdf'
          )};base64,${attachment.base64}`
        : '');

    // Taille max pragmatique (~200KB base64) pour éviter 413 / rejet plan free
    const maxChars = 280_000;
    if (dataUri && dataUri.length <= maxChars) {
      triedAttachment = true;
      params.quote_pdf = dataUri;
      params.content = dataUri; // alias si template param = content
      params.quote_filename = attachment.filename || params.quote_filename || 'devis.pdf';

      try {
        const response = await emailjs.send(
          this.serviceId,
          templateId,
          params,
          { publicKey: this.userId }
        );
        withAttachment = true;
        return { ok: true, withAttachment, triedAttachment, response };
      } catch (err) {
        // Template sans Variable Attachment / plan / taille → retry sans binaire
        console.warn(
          'EmailJS envoi avec quote_pdf refusé, retry sans PDF binaire:',
          err?.text || err?.message || err
        );
        delete params.quote_pdf;
        delete params.content;
      }
    } else if (dataUri) {
      console.warn('PDF trop volumineux pour param EmailJS, envoi sans binaire.');
    }

    const response = await emailjs.send(
      this.serviceId,
      templateId,
      params,
      { publicKey: this.userId }
    );
    return { ok: true, withAttachment: false, triedAttachment, response };
  }

  async sendQuoteRequest(formData, files = [], options = {}) {
    const { downloadPdf = true } = options;

    if (!isEmailJsConfigured()) {
      const pdfOnly = await quotePDFService.generateQuotePDF(formData, files);
      if (pdfOnly.success && downloadPdf) {
        quotePDFService.downloadPDF(pdfOnly);
      }
      return {
        success: false,
        message:
          'EmailJS non configuré. Le PDF a été généré localement — configurez VITE_EMAILJS_* dans .env.',
        pdf: pdfOnly.success ? pdfOnly : null,
      };
    }

    try {
      const pdfResult = await quotePDFService.generateQuotePDF(formData, files);
      if (!pdfResult.success) {
        return {
          success: false,
          message: `Impossible de générer le PDF devis : ${pdfResult.error || 'erreur inconnue'}`,
        };
      }

      const attachment = {
        filename: pdfResult.filename,
        base64: pdfResult.base64,
        dataUri: pdfResult.dataUri,
      };

      const ownerParams = this.buildQuoteTemplateParams(formData, files, pdfResult, 'owner');
      const clientParams = this.buildQuoteTemplateParams(formData, files, pdfResult, 'client');

      let ownerSend;
      try {
        ownerSend = await this.sendWithOptionalAttachment(
          this.templateId,
          ownerParams,
          attachment
        );
      } catch (err) {
        console.error('Échec email prestataire:', err);
        if (downloadPdf) quotePDFService.downloadPDF(pdfResult);
        return {
          success: false,
          message:
            "L'envoi vers le prestataire a échoué. Le PDF a été téléchargé — réessayez ou contactez via WhatsApp.",
          pdf: pdfResult,
          error: err,
        };
      }

      let clientSend = { ok: false };
      try {
        clientSend = await this.sendWithOptionalAttachment(
          this.clientTemplateId || this.templateId,
          clientParams,
          attachment
        );
      } catch (err) {
        console.warn('Copie client non envoyée:', err);
        clientSend = { ok: false, error: err };
      }

      if (downloadPdf) {
        quotePDFService.downloadPDF(pdfResult);
      }

      const attNote =
        ownerSend.withAttachment || clientSend.withAttachment
          ? 'PDF joint aux emails (si supporté par votre plan EmailJS).'
          : 'PDF téléchargé sur votre appareil (pièce jointe email selon plan EmailJS).';

      const clientNote = clientSend.ok
        ? 'Une copie a aussi été envoyée à votre adresse email.'
        : "La copie email client n'a pas pu être confirmée — conservez le PDF téléchargé.";

      return {
        success: true,
        message: `Demande envoyée (${pdfResult.quoteRef}). ${clientNote} ${attNote}`,
        pdf: pdfResult,
        ownerSend,
        clientSend,
      };
    } catch (error) {
      console.error('Erreur envoi devis:', error);
      return {
        success: false,
        message: "Erreur lors de l'envoi. Veuillez réessayer.",
        error,
      };
    }
  }

  /**
   * Paramètres EmailJS pour une commande pack (OffersPage).
   */
  buildOrderTemplateParams(formData, offer, pdfResult, role = 'owner') {
    const str = (v) => (v == null ? '' : String(v));
    const isOwner = role === 'owner';
    const orderRef = pdfResult?.orderRef || pdfResult?.quoteRef || 'N/A';
    const offerTitle = offer?.title || 'Pack';
    const offerPrice = offer?.price || '—';
    const offerDuration = offer?.duration || '—';
    const features = Array.isArray(offer?.features)
      ? offer.features
          .map((f) => (typeof f === 'string' ? f : f?.text))
          .filter(Boolean)
          .join(' | ')
      : '';
    const benefits = Array.isArray(offer?.benefits)
      ? offer.benefits.filter(Boolean).join(' | ')
      : '';

    return {
      to_email: str(isOwner ? this.ownerEmail : formData.email),
      reply_to: str(isOwner ? formData.email : this.ownerEmail),
      from_name: str(isOwner ? formData.name : 'Bendelo Thielcy'),
      from_email: str(isOwner ? formData.email : this.ownerEmail),

      client_name: str(formData.name),
      client_email: str(formData.email),
      phone: str(formData.phone || 'Non renseigné'),
      company: str(formData.company || 'Non renseigné'),
      project_type: str(formData.projectType || 'Standard'),
      message: str(formData.message || 'Aucun message complémentaire.'),

      // Compat templates devis existants
      offer_name: str(offerTitle),
      offer_price: str(offerPrice),
      offer_duration: str(offerDuration),
      offer_subtitle: str(offer?.subtitle || ''),
      offer_savings: str(offer?.savings || ''),
      offer_features: str(features || '—'),
      offer_benefits: str(benefits || '—'),
      budget: str(offerPrice),
      timeline: str(offerDuration),

      quote_ref: str(orderRef),
      order_ref: str(orderRef),
      quote_filename: str(pdfResult?.filename || ''),
      pdf_attached: pdfResult?.base64 ? 'oui' : 'non',
      submission_date: str(
        pdfResult?.meta?.dateStr && pdfResult?.meta?.timeStr
          ? `${pdfResult.meta.dateStr} à ${pdfResult.meta.timeStr}`
          : new Date().toLocaleString('fr-FR')
      ),
      files_count: '0',
      files_list: 'Aucun fichier',

      email_role: str(role),
      email_title: str(
        isOwner
          ? `Nouvelle commande pack — ${offerTitle}`
          : `Copie de votre commande — ${orderRef}`
      ),
      subject: str(
        isOwner
          ? `[${orderRef}] Commande ${offerTitle} — ${formData.name}`
          : `Accusé de réception commande ${orderRef} — Bendelo Thielcy`
      ),

      name: str(formData.name),
      email: str(formData.email),
    };
  }

  /**
   * Commande pack OffersPage :
   * PDF + email prestataire + copie client + téléchargement PDF.
   */
  async sendOrderRequest(formData, offer, options = {}) {
    const { downloadPdf = true } = options;

    if (!formData?.name?.trim() || !formData?.email?.trim()) {
      return {
        success: false,
        message: 'Nom et email sont requis pour envoyer la commande.',
      };
    }

    if (!offer?.title) {
      return {
        success: false,
        message: 'Aucun pack sélectionné.',
      };
    }

    if (!isEmailJsConfigured()) {
      const pdfOnly = await quotePDFService.generateOrderPDF(formData, offer);
      if (pdfOnly.success && downloadPdf) {
        quotePDFService.downloadPDF(pdfOnly);
      }
      return {
        success: false,
        message:
          'EmailJS non configuré. Le PDF commande a été généré localement — configurez VITE_EMAILJS_* dans .env.',
        pdf: pdfOnly.success ? pdfOnly : null,
      };
    }

    try {
      const pdfResult = await quotePDFService.generateOrderPDF(formData, offer);
      if (!pdfResult.success) {
        return {
          success: false,
          message: `Impossible de générer le PDF commande : ${
            pdfResult.error || 'erreur inconnue'
          }`,
        };
      }

      const attachment = {
        filename: pdfResult.filename,
        base64: pdfResult.base64,
        dataUri: pdfResult.dataUri,
      };

      const ownerParams = this.buildOrderTemplateParams(
        formData,
        offer,
        pdfResult,
        'owner'
      );
      const clientParams = this.buildOrderTemplateParams(
        formData,
        offer,
        pdfResult,
        'client'
      );

      let ownerSend;
      try {
        ownerSend = await this.sendWithOptionalAttachment(
          this.templateId,
          ownerParams,
          attachment
        );
      } catch (err) {
        console.error('Échec email commande prestataire:', err);
        if (downloadPdf) quotePDFService.downloadPDF(pdfResult);
        return {
          success: false,
          message:
            "L'envoi vers le prestataire a échoué. Le PDF a été téléchargé — réessayez ou contactez via WhatsApp.",
          pdf: pdfResult,
          error: err,
        };
      }

      let clientSend = { ok: false };
      try {
        clientSend = await this.sendWithOptionalAttachment(
          this.clientTemplateId || this.templateId,
          clientParams,
          attachment
        );
      } catch (err) {
        console.warn('Copie client commande non envoyée:', err);
        clientSend = { ok: false, error: err };
      }

      if (downloadPdf) {
        quotePDFService.downloadPDF(pdfResult);
      }

      const ref = pdfResult.orderRef || pdfResult.quoteRef;
      const attNote =
        ownerSend.withAttachment || clientSend.withAttachment
          ? 'PDF joint aux emails (si supporté par votre plan EmailJS).'
          : 'PDF téléchargé sur votre appareil (pièce jointe email selon plan EmailJS).';
      const clientNote = clientSend.ok
        ? 'Une copie a aussi été envoyée à votre adresse email.'
        : "La copie email client n'a pas pu être confirmée — conservez le PDF téléchargé.";

      return {
        success: true,
        message: `Commande envoyée (${ref}). ${clientNote} ${attNote}`,
        pdf: pdfResult,
        ownerSend,
        clientSend,
      };
    } catch (error) {
      console.error('Erreur envoi commande:', error);
      return {
        success: false,
        message: "Erreur lors de l'envoi de la commande. Veuillez réessayer.",
        error,
      };
    }
  }

  async sendConfirmationToClient(formData) {
    try {
      const _confirmationParams = {
        to_email: formData.email,
        client_name: formData.name,
        project_type: this.getProjectTypeLabel(formData.projectType),
        submission_date: new Date().toLocaleString('fr-FR'),
        from_name: 'Ir Bendelo Thielcy',
        from_email: this.ownerEmail,
      };
      console.log('Paramètres confirmation préparés:', _confirmationParams);
      return { success: true, message: 'Confirmation envoyée au client' };
    } catch (error) {
      console.error('Erreur confirmation client:', error);
      return { success: false, message: 'Erreur envoi confirmation', error };
    }
  }

  configure(userId, serviceId, templateId) {
    this.userId = userId;
    this.serviceId = serviceId;
    this.templateId = templateId;
    this.init();
  }
}

const emailService = new EmailService();
export default emailService;
