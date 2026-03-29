import React from "react";

function GoogleMapsSection() {
  return (
    <section className="py-16 px-8 bg-gradient-to-b from-black via-black-50 to-blur-50" id="localisation">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl text-center text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">Localisation professionnelle</h2>
        <p className="text-lg text-gray-400 mb-10 text-center">Retrouvez-moi à mon siège, Avenue Kimwenza A/A25, Kinshasa, DR Congo. Toujours disponibles pour tous vos projets professionnels.</p>
        <div className="rounded-2xl overflow-hidden shadow-xl border border-blue-100">
          <iframe
            title="Google Maps localisation"
            src="https://www.google.com/maps?q=Avenue+Kimwenza+A%2FA25,+Kinshasa,+DR+Congo&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="text-lg text-gray-400 mb-10 text-center">
          <strong>Adresse :</strong> Kinshasa, DR Congo<br />
          <strong>Téléphone :</strong> +243 82 90 54 350<br />
          <strong>Email :</strong> bendelothielcy@gmail.com
        </div>
      </div>
    </section>
  );
}

export default GoogleMapsSection;
