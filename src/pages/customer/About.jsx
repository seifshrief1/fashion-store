import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section
        className="h-[90vh] bg-cover bg-center flex items-center justify-start px-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=1500&q=80')",
        }}
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Redefining Modern Fashion
          </h1>
          <p className="mt-4 text-white text-lg drop-shadow-sm">
            Experience style, sustainability, and statement in every outfit.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-24">
        <h2 className="text-4xl font-bold mb-6">Our Story</h2>
        <p className="text-lg text-gray-600 leading-8 max-w-4xl">
          At <span className="text-pink-500 font-semibold">MODERA</span>, we
          blend timeless fashion with modern design. From elegant silhouettes to
          bold streetwear, our curated pieces are made to inspire and empower.
          <br />
          <br />
          With a focus on sustainability, we source quality fabrics and
          prioritize ethical practices — because fashion should feel good in
          every way.
        </p>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20 px-6 md:px-24">
        <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              name: "Lena Grey",
              role: "Founder & CEO",
              image: "https://randomuser.me/api/portraits/women/50.jpg",
            },
            {
              name: "Marco Lee",
              role: "Head of Design",
              image: "https://randomuser.me/api/portraits/men/41.jpg",
            },
            {
              name: "Sophia Kim",
              role: "Marketing Lead",
              image: "https://randomuser.me/api/portraits/women/33.jpg",
            },
          ].map((person, idx) => (
            <div key={idx} className="text-center">
              <img
                src={person.image}
                alt={person.name}
                className="w-36 h-36 rounded-full object-cover mx-auto shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold">{person.name}</h3>
              <p className="text-gray-500">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Padding to make the page long */}
      <div className="h-32"></div>
    </div>
  );
};

export default About;
