import jsPDF from 'jspdf';

/**
 * Génère un PDF de demande de devis personnalisé (dossier client).
 * Style industriel Bendelo — A4 portrait.
 */
class QuotePDFService {
  constructor() {
    this.company = {
      name: 'Bendelo Thielcy',
      title: 'Principal Software Engineer',
      email: 'bendelothielcy@gmail.com',
      phone: '+243 829 054 350',
      website: typeof window !== 'undefined' ? window.location.origin : 'https://bendelo.dev',
      whatsapp: 'https://wa.me/243829054350',
    };

    this.projectTypes = {
      'site-web': 'Site Web vitrine',
      'e-commerce': 'Site E-commerce',
      application: 'Application Web',
      mobile: 'Application Mobile',
      cybersecurite: 'Cybersécurité',
      maintenance: 'Maintenance',
      cloud: 'Cloud & Hébergement',
      autre: 'Autre projet',
    };

    this.timelines = {
      urgent: "Urgent (< 1 semaine)",
      '1-2-semaines': '1–2 semaines',
      '1-2-mois': '1–2 mois',
      '3-6-mois': '3–6 mois',
      flexible: 'Flexible',
    };
  }

  _buildRef(prefix, formData = {}) {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const seed = `${formData.email || ''}${formData.name || ''}${d.getTime()}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const suffix = hash.toString(36).toUpperCase().slice(0, 4).padStart(4, '0');
    return `${prefix}-${y}${m}${day}-${suffix}`;
  }

  generateQuoteRef(formData = {}) {
    return this._buildRef('DEV', formData);
  }

  generateOrderRef(formData = {}) {
    return this._buildRef('CMD', formData);
  }

  _safeClientSlug(name) {
    return (
      String(name || 'client')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9-_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 32) || 'client'
    );
  }

  _nowLabels() {
    const now = new Date();
    return {
      dateStr: now.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      timeStr: now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }

  /**
   * Helpers de rendu partagés (header / sections / footer).
   */
  _createDocContext(docTitle, ref) {
    const { dateStr, timeStr } = this._nowLabels();
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 16;
    const contentW = pageW - margin * 2;
    const orange = [255, 107, 53];
    const dark = [10, 22, 34];
    const slate = [100, 116, 139];
    const ink = [15, 23, 42];

    pdf.setFillColor(...dark);
    pdf.rect(0, 0, pageW, 36, 'F');
    pdf.setFillColor(...orange);
    pdf.rect(0, 36, pageW, 1.2, 'F');

    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, 10, 14, 14, 'F');
    pdf.setTextColor(...dark);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text('BT', margin + 7, 19, { align: 'center' });

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text(this.company.name.toUpperCase(), margin + 18, 16);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(...orange);
    pdf.text(this.company.title.toUpperCase(), margin + 18, 22);

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(docTitle, pageW - margin, 15, { align: 'right' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(200, 210, 220);
    pdf.text(`Réf. ${ref}`, pageW - margin, 21, { align: 'right' });
    pdf.text(`${dateStr} · ${timeStr}`, pageW - margin, 26, { align: 'right' });

    let y = 48;

    const ensureSpace = (need = 24) => {
      if (y > pageH - need) {
        pdf.addPage();
        y = margin;
      }
    };

    const sectionTitle = (title) => {
      ensureSpace(40);
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin, y - 4, contentW, 8, 'F');
      pdf.setFillColor(...orange);
      pdf.rect(margin, y - 4, 1.5, 8, 'F');
      pdf.setTextColor(...ink);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text(title.toUpperCase(), margin + 4, y + 1.5);
      y += 10;
    };

    const row = (label, value) => {
      const val = String(value || '—').trim() || '—';
      ensureSpace(24);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(...slate);
      pdf.text(label, margin, y);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...ink);
      const lines = pdf.splitTextToSize(val, contentW - 48);
      pdf.text(lines, margin + 48, y);
      y += Math.max(5.5, lines.length * 4.2);
    };

    const paragraph = (text, size = 9, color = ink) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(size);
      pdf.setTextColor(...color);
      const lines = pdf.splitTextToSize(String(text || ''), contentW);
      ensureSpace(lines.length * 4.2 + 8);
      pdf.text(lines, margin, y);
      y += lines.length * 4.2;
    };

    const finish = (filenamePrefix, extraMeta = {}) => {
      ensureSpace(36);
      pdf.setDrawColor(...orange);
      pdf.setLineWidth(0.4);
      pdf.line(margin, y, pageW - margin, y);
      y += 6;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(...ink);
      pdf.text('Contact prestataire', margin, y);
      y += 5;
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...slate);
      pdf.text(`${this.company.email}  ·  ${this.company.phone}`, margin, y);
      y += 4;
      pdf.text(`${this.company.website}  ·  WhatsApp disponible sur demande`, margin, y);
      y += 6;
      pdf.setFontSize(7.5);
      pdf.setTextColor(148, 163, 184);
      pdf.text(
        'Document non contractuel — estimation et engagement formalisés après validation mutuelle.',
        margin,
        y
      );

      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i += 1) {
        pdf.setPage(i);
        pdf.setFillColor(...dark);
        pdf.rect(0, pageH - 12, pageW, 12, 'F');
        pdf.setTextColor(200, 210, 220);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7);
        pdf.text(
          `${this.company.name}  //  ${ref}  //  page ${i}/${pageCount}`,
          margin,
          pageH - 5
        );
        pdf.setTextColor(...orange);
        pdf.text('CONFIDENTIEL', pageW - margin, pageH - 5, { align: 'right' });
      }

      const filename = `${filenamePrefix}-${ref}-${this._safeClientSlug(extraMeta.clientName)}.pdf`;
      const dataUri = pdf.output('datauristring');
      const base64 = dataUri.includes(',') ? dataUri.split(',')[1] : dataUri;

      return {
        success: true,
        pdf,
        filename,
        quoteRef: ref,
        orderRef: ref,
        base64,
        dataUri,
        meta: {
          dateStr,
          timeStr,
          ...extraMeta,
        },
      };
    };

    return {
      pdf,
      margin,
      contentW,
      pageH,
      orange,
      dark,
      slate,
      ink,
      dateStr,
      timeStr,
      get y() {
        return y;
      },
      set y(v) {
        y = v;
      },
      ensureSpace,
      sectionTitle,
      row,
      paragraph,
      finish,
    };
  }

  getProjectTypeLabel(type) {
    return this.projectTypes[type] || type || 'Non précisé';
  }

  getTimelineLabel(timeline) {
    return this.timelines[timeline] || timeline || 'Non précisé';
  }

  /**
   * @param {object} formData
   * @param {File[]} files
   */
  async generateQuotePDF(formData, files = []) {
    try {
      const quoteRef = this.generateQuoteRef(formData);
      const ctx = this._createDocContext('DEMANDE DE DEVIS', quoteRef);
      const { pdf, margin, ink, slate } = ctx;

      pdf.setTextColor(...ink);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Dossier client — synthèse de la demande', margin, ctx.y);
      ctx.y += 6;
      ctx.paragraph(
        "Document généré automatiquement depuis le formulaire de devis. Il regroupe l'identité du client, le scope projet et les pièces jointes déclarées. Proposition détaillée sous 24–48h ouvrées.",
        9,
        slate
      );
      ctx.y += 8;

      ctx.sectionTitle('1. Identité client');
      ctx.row('Nom', formData.name);
      ctx.row('Email', formData.email);
      ctx.row('Téléphone', formData.phone || 'Non renseigné');
      ctx.row('Société', formData.company || 'Non renseigné');
      ctx.row('Fonction', formData.job || 'Non renseigné');
      ctx.row('Secteur', formData.sector || 'Non renseigné');
      ctx.row('Site web', formData.website || 'Non renseigné');
      ctx.y += 4;

      ctx.sectionTitle('2. Scope projet');
      ctx.row('Service', this.getProjectTypeLabel(formData.projectType));
      ctx.row('Délai', this.getTimelineLabel(formData.timeline));
      ctx.row(
        'Budget',
        formData.budget
          ? `${Number(formData.budget).toLocaleString('fr-FR')} USD (estimatif)`
          : 'À définir'
      );
      ctx.y += 2;

      ctx.sectionTitle('3. Description du besoin');
      ctx.paragraph(
        (formData.message && String(formData.message).trim()) ||
          'Aucune description détaillée fournie.'
      );
      ctx.y += 8;

      ctx.sectionTitle('4. Pièces jointes déclarées');
      if (!files || files.length === 0) {
        ctx.row('Fichiers', 'Aucun fichier joint au formulaire');
      } else {
        files.forEach((file, i) => {
          const sizeKb = file?.size ? `${(file.size / 1024).toFixed(0)} KB` : '';
          ctx.row(`Fichier ${i + 1}`, `${file.name}${sizeKb ? ` (${sizeKb})` : ''}`);
        });
        ctx.y += 2;
        ctx.paragraph(
          'Note : le contenu binaire des fichiers uploadés n’est pas embarqué dans ce PDF (limite email navigateur). Les noms sont listés pour traçabilité.',
          7.5,
          slate
        );
        ctx.y += 4;
      }

      ctx.y += 6;
      ctx.sectionTitle('5. Prochaines étapes');
      [
        '1. Accusé de réception de votre dossier (ce document).',
        '2. Analyse du besoin et clarification éventuelle par email / WhatsApp.',
        '3. Proposition structurée (périmètre, planning, investissement) sous 24–48h ouvrées.',
        '4. Ajustements puis validation pour démarrage.',
      ].forEach((step) => {
        ctx.ensureSpace(20);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(...ink);
        pdf.text(step, margin, ctx.y);
        ctx.y += 5;
      });
      ctx.y += 8;

      return ctx.finish('devis', {
        clientName: formData.name,
        projectLabel: this.getProjectTypeLabel(formData.projectType),
        timelineLabel: this.getTimelineLabel(formData.timeline),
        kind: 'quote',
      });
    } catch (error) {
      console.error('Erreur génération PDF devis:', error);
      return {
        success: false,
        error: error?.message || 'Échec génération PDF',
      };
    }
  }

  /**
   * PDF de commande pack (OffersPage).
   * @param {object} formData - { name, email, phone, company, projectType, message }
   * @param {object} offer - pack sélectionné
   */
  async generateOrderPDF(formData, offer = {}) {
    try {
      const orderRef = this.generateOrderRef(formData);
      const ctx = this._createDocContext('COMMANDE PACK', orderRef);
      const { pdf, margin, ink, slate } = ctx;

      const features = Array.isArray(offer.features)
        ? offer.features.map((f) => (typeof f === 'string' ? f : f?.text)).filter(Boolean)
        : [];
      const benefits = Array.isArray(offer.benefits) ? offer.benefits.filter(Boolean) : [];

      pdf.setTextColor(...ink);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Bon de commande — pack commercial', margin, ctx.y);
      ctx.y += 6;
      ctx.paragraph(
        'Document généré automatiquement depuis la page Offres. Il formalise la sélection du pack, les coordonnées client et le message associé. Confirmation / planning sous 24–48h ouvrées.',
        9,
        slate
      );
      ctx.y += 8;

      ctx.sectionTitle('1. Identité client');
      ctx.row('Nom', formData.name);
      ctx.row('Email', formData.email);
      ctx.row('Téléphone', formData.phone || 'Non renseigné');
      ctx.row('Société', formData.company || 'Non renseigné');
      ctx.row('Type de projet', formData.projectType || 'Standard');
      ctx.y += 4;

      ctx.sectionTitle('2. Pack commandé');
      ctx.row('Pack', offer.title || 'Non précisé');
      ctx.row('Sous-titre', offer.subtitle || '—');
      ctx.row('Prix', offer.price || '—');
      ctx.row('Prix barré', offer.originalPrice || '—');
      ctx.row('Économie', offer.savings ? `${offer.savings}` : '—');
      ctx.row('Durée estimée', offer.duration || '—');
      ctx.y += 4;

      ctx.sectionTitle('3. Prestations incluses');
      if (features.length === 0) {
        ctx.row('Features', 'Non listées');
      } else {
        features.forEach((text, i) => ctx.row(`${i + 1}.`, text));
      }
      ctx.y += 4;

      ctx.sectionTitle('4. Bonus & avantages');
      if (benefits.length === 0) {
        ctx.row('Bonus', 'Non listés');
      } else {
        benefits.forEach((text, i) => ctx.row(`${i + 1}.`, text));
      }
      ctx.y += 4;

      ctx.sectionTitle('5. Message client');
      ctx.paragraph(
        (formData.message && String(formData.message).trim()) ||
          'Aucun message complémentaire.'
      );
      ctx.y += 8;

      ctx.sectionTitle('6. Prochaines étapes');
      [
        '1. Accusé de réception de la commande (ce document).',
        '2. Validation du périmètre et du planning avec le client.',
        '3. Envoi des modalités de démarrage / acompte si applicable.',
        '4. Kick-off et production selon le pack sélectionné.',
      ].forEach((step) => {
        ctx.ensureSpace(20);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(...ink);
        pdf.text(step, margin, ctx.y);
        ctx.y += 5;
      });
      ctx.y += 8;

      return ctx.finish('commande', {
        clientName: formData.name,
        kind: 'order',
        offerTitle: offer.title || '',
        offerPrice: offer.price || '',
        offerDuration: offer.duration || '',
        offerSubtitle: offer.subtitle || '',
        projectLabel: formData.projectType || 'Standard',
      });
    } catch (error) {
      console.error('Erreur génération PDF commande:', error);
      return {
        success: false,
        error: error?.message || 'Échec génération PDF commande',
      };
    }
  }

  downloadPDF(pdfResult) {
    if (!pdfResult?.pdf || !pdfResult?.filename) return false;
    try {
      pdfResult.pdf.save(pdfResult.filename);
      return true;
    } catch (e) {
      console.error('Téléchargement PDF impossible:', e);
      return false;
    }
  }
}

const quotePDFService = new QuotePDFService();
export default quotePDFService;
