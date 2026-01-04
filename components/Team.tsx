'use client';

export default function Team() {
  const teamMembers = [
    {
      name: 'Yash Tamhane',
      role: 'Developer',
      image: '/team/member1.png',
      bio: 'Full-stack developer passionate about building scalable web applications and crafting seamless user experiences with modern technologies.',
      linkedin: 'https://www.linkedin.com/in/yash-tamhane/',
      instagram: 'https://www.instagram.com/eminencet/',
    },
    {
      name: 'Utkarsh Bhalwankar',
      role: 'Developer',
      image: '/team/member2.jpg',
      bio: 'Dedicated developer focused on creating clean, efficient code and delivering high-quality web solutions that exceed client expectations.',
      linkedin: 'https://www.linkedin.com/in/utkarsh-bhalwankar-02a44b249/',
      instagram: 'https://www.instagram.com/my_ikigai_quest/',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* About Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">Meet Our Team</h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto mb-4">
            We're a small but passionate team dedicated to building custom websites that help businesses and individuals succeed online.
          </p>
          {/* <p className="text-secondary max-w-3xl mx-auto">
            Every website we create is hand-coded from scratch, ensuring quality, performance, and uniqueness. We believe in transparent communication, fixed timelines, and delivering exactly what our clients envision.
          </p> */}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-80 flex items-center justify-center bg-primary/5">
                <div className="w-64 h-64 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-accent font-medium mb-3">{member.role}</p>
                <p className="text-secondary mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-3">Want to Join Us?</h2>
          <p className="text-secondary mb-6 max-w-2xl mx-auto">
            We're always looking for talented developers and designers who share our passion for creating amazing websites. If you're interested in joining our growing team, we'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-background px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
