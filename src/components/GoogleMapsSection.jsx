import React from "react";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaMap } from "react-icons/fa";

function GoogleMapsSection() {
  return (
    <section className="py-20 px-6 transition-colors duration-300 relative border-t border-slate-200/50 dark:border-white/5" 
             style={{ backgroundColor: 'var(--bg)' }} 
             id="localisation">
   
        {/* Header avec Icône */}
        <div className="text-center mb-12">
         <div className="text-center mb-20 relative">
  {/* Badge de localisation dynamique */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8"
  >
    <FaMap className="text-orange-500 animate-bounce" />
    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
      Global Presence / Local Hub
    </span>
  </motion.div>
  
  {/* Titre Localisation Ultra-Massif */}
  <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-none">
    <span className="text-[var(--text-primary)] opacity-90">Ancrage </span>
    <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
      Stratégique
    </span>
    <span className="text-orange-500">.</span>
  </h2>

  {/* Description orientée "Business Hub" */}
  <div className="max-w-3xl mx-auto space-y-6">
    <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--text-primary)]">
      Opérant depuis le cœur de <span className="font-bold italic text-orange-500">Kinshasa</span>, 
      je déploie des écosystèmes technologiques pour des partenaires 
      <span className="font-black dark:text-white text-slate-900 ml-2 border-b-2 border-orange-500/30">
        panafricains et globaux.
      </span>
    </p>

    {/* Indicateur de connectivité */}
    <div className="flex justify-center items-center gap-4 pt-4 opacity-60">
      <div className="h-[1px] w-8 bg-slate-500" />
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--text-secondary)]">
        Connectivité Fibre • Serveurs Localisés • Support 24/7
      </p>
      <div className="h-[1px] w-8 bg-slate-500" />
    </div>
  </div>
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
