import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      image: 'https://picsum.photos/200/200?random=1',
      bio: 'Book enthusiast with over 15 years of experience in the publishing industry.'
    },
    {
      name: 'Jane Smith',
      role: 'Head of Curation',
      image: 'https://picsum.photos/200/200?random=2',
      bio: 'Literature expert specializing in discovering unique and compelling reads.'
    },
    {
      name: 'Mike Johnson',
      role: 'Customer Experience Manager',
      image: 'https://picsum.photos/200/200?random=3',
      bio: 'Dedicated to ensuring every customer finds their perfect book match.'
    }
  ];

  const testimonials = [
    {
      text: "The best bookstore I've ever shopped at. Their collection is amazing!",
      author: 'Sarah Wilson',
      role: 'Book Reviewer'
    },
    {
      text: 'Exceptional service and a fantastic selection of books. Highly recommended!',
      author: 'David Thompson',
      role: 'Literature Professor'
    }
  ];

  return (
    <div className="py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Founded in 2010, we've been passionate about connecting readers with their next favorite book.
            Our journey began with a simple idea: to create a space where book lovers could discover,
            explore, and share their love for reading.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To inspire and nurture a love for reading by providing carefully curated books
              and creating a community where readers can connect, discover, and grow.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Quality over quantity in our book selection</li>
              <li>• Personal touch in customer service</li>
              <li>• Community engagement and literary events</li>
              <li>• Supporting emerging authors and diverse voices</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-red font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Be part of our growing community of book lovers. Visit our store or shop online today.
          </p>
          <button className="bg-primary-red text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300">
            Visit Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
