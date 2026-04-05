import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaMap } from "react-icons/fa";

function GoogleMapsSection() {
  return (
    <section className="py-20 px-6 transition-colors duration-300 relative" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="localisation">
      
      <div className="max-w-4xl mx-auto">
        {/* Header avec Icône */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
               style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', color: 'var(--accent-1)' }}>
            <FaMap />
            <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>Où me trouver ?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text inline-block">
            Localisation Professionnelle
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Basé à Kinshasa, j'accompagne les entreprises locales et internationales dans leur transformation digitale.
          </p>
        </div>

        {/* Conteneur Carte + Infos */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Colonne Infos de Contact */}
          <div className="space-y-4 md:col-span-1 order-2 md:order-1">
            {[
              { icon: <FaMapMarkerAlt />, label: "Adresse", value: "Av. Kimwenza A/A25, Kinshasa, RDC" },
              { icon: <FaPhoneAlt />, label: "Téléphone", value: "+243 82 90 54 350" },
              { icon: <FaEnvelope />, label: "Email", value: "bendelothielcy@gmail.com" }
            ].map((info, idx) => (
              <div key={idx} className="p-4 rounded-xl border transition-all hover:translate-x-2"
                   style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow)' }}>
                <div className="flex items-center gap-3 mb-1" style={{ color: 'var(--accent-1)' }}>
                  {info.icon}
                  <span className="text-xs font-bold uppercase tracking-wider">{info.label}</span>
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {info.value}
                </div>
              </div>
            ))}
          </div>

          {/* Colonne Google Maps */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 shadow-purple-500/10" 
                 style={{ borderColor: 'var(--surface)' }}>
              <iframe
                title="Google Maps localisation"
                src="https://www.google.com/maps?q=Avenue+Kimwenza+A%2FA25,+Kinshasa,+DR+Congo&output=embed"
                width="100%"
                height="400"
                style={{ border: 0, filter: 'var(--bg) === "#0f0f0f" ? "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" : "none"' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Note de disponibilité */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium italic" style={{ color: 'var(--text-secondary)' }}>
            Bureau ouvert du Lundi au Samedi • 08h00 - 18h00
          </p>
        </div>
      </div>
    </section>
  );
}

export default GoogleMapsSection;
