import React from "react";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaMap } from "react-icons/fa";

function GoogleMapsSection() {
  return (
    <section 
      className="py-24 px-6 border-t border-slate-200 dark:border-white/10" 
      style={{ backgroundColor: 'var(--bg)' }} 
      id="localisation"
    >
      <div className="max-w-7xl mx-auto relative z-10">
   
        {/* --- EN-TÊTE DE SECTION --- */}
        <div className="text-center mb-20">
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            // Global Presence / Local Hub
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-widest uppercase text-xs">
            Ancrage <span className="underline decoration-1 underline-offset-8">Stratégique</span>
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-base text-slate-600 dark:text-slate-400 font-normal tracking-wide leading-relaxed">
              Opérant depuis le cœur de Kinshasa, je déploie des écosystèmes technologiques pour des partenaires panafricains et globaux.
            </p>

            <div className="flex justify-center items-center gap-4 pt-2 font-mono text-[9px] text-slate-400 dark:text-slate-500">
              <div className="h-[1px] w-6 bg-slate-200 dark:bg-white/10" />
              <span>CONNECTIVITÉ FIBRE • SERVEURS LOCALISÉS • SUPPORT 24/7</span>
              <div className="h-[1px] w-6 bg-slate-200 dark:bg-white/10" />
            </div>
          </div>
        </div>

        {/* --- CONTENEUR CARTE + LOGS TECHNIQUES --- */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Colonne Fiches de Données (1 colonne) */}
          <div className="space-y-4 md:col-span-1 order-2 md:order-1">
            {[
              { icon: <FaMapMarkerAlt />, label: "Adresse", value: "Av. Kimwenza A/A25, Kinshasa, RDC" },
              { icon: <FaPhoneAlt />, label: "Téléphone", value: "+243 82 90 54 350" },
              { icon: <FaEnvelope />, label: "Email", value: "bendelothielcy@gmail.com" }
            ].map((info, idx) => (
              <div 
                key={idx} 
                className="p-5 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] transition-colors duration-200 hover:border-slate-400 dark:hover:border-white/30"
              >
                <div className="flex items-center gap-3 mb-2 text-slate-950 dark:text-white">
                  <span className="text-slate-400 dark:text-slate-500 text-sm">
                    {info.icon}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">// [ {info.label.toLowerCase()} ]</span>
                </div>
                <div className="text-xs font-normal text-slate-600 dark:text-slate-300 tracking-wide font-sans pl-6">
                  {info.value}
                </div>
              </div>
            ))}
          </div>

          {/* Colonne Google Maps (2 colonnes) */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b] p-2">
              <iframe
                title="Google Maps localisation"
                src="https://www.google.com/maps?q=Avenue+Kimwenza+A%2FA25,+Kinshasa,+DR+Congo&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                className="grayscale dark:invert-[90%] dark:hue-rotate-180 dark:brightness-[95%] dark:contrast-[90%] transition-all duration-300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Note de disponibilité style bas de terminal */}
        <div className="mt-12 text-center font-mono text-[9px] text-slate-400 dark:text-slate-500">
          <p>[availability_window]: Bureau ouvert du Lundi au Samedi • 08h00 - 18h00 [GMT+1]</p>
        </div>

      </div>
    </section>
  );
}

export default GoogleMapsSection;
