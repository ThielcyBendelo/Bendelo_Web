# Devis PDF + double envoi EmailJS

## Flux

1. Le client remplit le modal **Dossier Devis**
2. Génération d’un PDF personnalisé (`quotePDFService`) avec référence `DEV-YYYYMMDD-XXXX`
3. Email **prestataire** (`bendelothielcy@gmail.com` ou `VITE_OWNER_EMAIL`)
4. Email **copie client** (adresse saisie dans le formulaire)
5. Téléchargement automatique du PDF dans le navigateur du client

## Variables `.env`

```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_owner_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
# Optionnel : template dédié copie client
# VITE_EMAILJS_CLIENT_TEMPLATE_ID=template_client_xxx
# VITE_OWNER_EMAIL=bendelothielcy@gmail.com
```

Redémarrer Vite après toute modification du `.env`.

## Template EmailJS (obligatoire)

Dans **Email Templates** → ton template devis :

### Settings

| Champ | Valeur |
|--------|--------|
| **To Email** | `{{to_email}}` |
| **Reply To** | `{{reply_to}}` |
| **Subject** | `{{subject}}` |

Sans `{{to_email}}`, la copie client partira toujours vers ton adresse fixe.

### Corps (variables utiles)

```text
{{email_title}}

Réf devis : {{quote_ref}}
Date : {{submission_date}}

Client : {{client_name}}
Email : {{client_email}}
Tél : {{phone}}
Société : {{company}}
Fonction : {{job}}
Secteur : {{sector}}
Site : {{website}}

Service : {{project_type}}
Budget : {{budget}}
Délai : {{timeline}}

Message :
{{message}}

Fichiers déclarés ({{files_count}}) :
{{files_list}}

PDF : {{quote_filename}}
```

### Template client (recommandé)

Crée un 2ᵉ template plus soft (accusé de réception) et mets son ID dans  
`VITE_EMAILJS_CLIENT_TEMPLATE_ID`.  
Même principe : **To Email = `{{to_email}}`**.

## Pièce jointe PDF (correct EmailJS)

EmailJS **n’utilise pas** un champ REST `attachments`. Il faut une **Variable Attachment** dans le template :

1. EmailJS → ton template → onglet **Attachments**
2. **Add Attachment** → type **Variable Attachment**
3. **Parameter name** : `quote_pdf` (recommandé)  
   (le code envoie aussi `content` en alias)
4. **Filename** : `{{quote_filename}}` ou `devis.pdf`
5. **Content type** : `PDF` / `application/pdf`

Le code envoie le PDF en **data URI base64** dans `quote_pdf` (comme `canvas.toDataURL()` dans la doc officielle).

- Si la Variable Attachment n’est pas configurée (ou plan / taille), l’email part **sans binaire** et le client **télécharge le PDF** dans le navigateur.
- Les fichiers uploadés par le client sont **listés** (noms) dans le PDF/email.

## Test rapide

1. `npm run dev` depuis `ir-bendelo`
2. Services → Demander un devis
3. Remplir avec **ton email client de test**
4. Vérifier :
   - email reçu sur `bendelothielcy@gmail.com`
   - copie sur l’email client
   - fichier `devis-DEV-....pdf` téléchargé
