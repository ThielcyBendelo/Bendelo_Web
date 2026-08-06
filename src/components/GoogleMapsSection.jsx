import React from "react";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function GoogleMapsSection() {
  return (
    <section 
      className="py-24 px-6 relative overflow-hidden bg-[#0A1622] border-t border-white/5" 
      id="localisation"
    >
      {/* --- MAILLAGE BLUEPRINT GÉOMÉTRIQUE EN ARRIÈRE-PLAN --- */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`, 
          backgroundSize: '45px 45px',
          backgroundPosition: 'center top'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
   
        {/* --- EN-TÊTE DE SECTION STYLE HUB --- */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <span className="text-[#FF6B35] font-mono font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">
            // GLOBAL_PRESENCE_/_LOCAL_HUB
          </span>
          
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            ANCRAGE <span className="text-[#FF6B35] italic">STRATÉGIQUE</span>
          </h2>

          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Opérant depuis le cœur de Kinshasa, je déploie des écosystèmes technologiques résilients pour des partenaires panafricains et globaux.
            </p>

            <div className="flex justify-center items-center gap-4 pt-2 font-mono text-[9px] text-slate-500 tracking-wider">
              <div className="h-[1px] w-8 bg-white/10" />
              <span>CONNECTIVITÉ FIBRE • SERVEURS LOCALISÉS • SUPPORT 24/7</span>
              <div className="h-[1px] w-8 bg-white/10" />
            </div>
          </div>
        </div>

        {/* --- CONTENEUR CARTE + LOGS TECHNIQUES --- */}
        <div className="grid md:grid-cols-3 gap-8 items-start w-full">
          
          {/* Colonne Fiches de Données (1 colonne) */}
          <div className="space-y-4 md:col-span-1 order-2 md:order-1 w-full">
            {[
              { icon: <FaMapMarkerAlt />, label: "Adresse", value: "Av. Kimwenza A/A25, Kalamu, Kinshasa, RDC" },
              { icon: <FaPhoneAlt />, label: "Téléphone", value: "+243 82 90 54 350" },
              { icon: <FaEnvelope />, label: "Email", value: "bendelothielcy@gmail.com" }
            ].map((info, idx) => (
              <div 
                key={idx} 
                className="group relative p-5 border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#FF6B35]/40 rounded-none shadow-2xl"
              >
                {/* Micro-lueur angulaire d'arrière-plan au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none" />
                
                <div className="flex items-center gap-3 mb-2 text-white relative z-10">
                  <span className="text-slate-400 group-hover:text-[#FF6B35] transition-colors duration-300 text-sm">
                    {info.icon}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF6B35]">
                    // [ {info.label.toLowerCase()} ]
                  </span>
                </div>
                <div className="text-sm text-slate-400 font-medium tracking-wide pl-6 relative z-10">
                  {info.value}
                </div>
              </div>
            ))}
          </div>

          {/* Colonne Google Maps (2 colonnes) - Parfaitement Intégrée */}
          <div className="md:col-span-2 order-1 md:order-2 w-full">
            <div className="border border-white/10 bg-white/[0.02] backdrop-blur-xl p-2 rounded-none shadow-2xl">
              <iframe
                title="Google Maps localisation"
                src="https://maps.google.com/maps?q=Av.+Kimwenza+A%2FA25,+Kalamu,+Kinshasa,+RDC&z=15&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                className="grayscale dark:invert-[90%] dark:hue-rotate-180 dark:brightness-[85%] dark:contrast-[100%] transition-all duration-300 rounded-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Note de disponibilité style bas de terminal */}
        <div className="mt-12 text-center font-mono text-[10px] tracking-widest text-slate-500 uppercase">
          <p>&gt;_ [AVAILABILITY_WINDOW]: Bureau ouvert du Lundi au Samedi • 08h00 - 18h00 [WAT / GMT+1]</p>
        </div>

      </div>
    </section>
  );
}

export default GoogleMapsSection;
