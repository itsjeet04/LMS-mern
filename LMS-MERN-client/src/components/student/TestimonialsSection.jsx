import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

function TestimonialsSection() {
  return (
    <section className="py-10 bg-gray-50 px-4 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
        What Our Students Say
      </h2>
      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-10 text-sm md:text-base">
        Hear from our students about their learning experiences and how our courses helped them achieve their goals. 
        Join a thriving community where you can grow, connect, and succeed.
      </p>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-300"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />

            {/* Star Ratings */}
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt="Star"
                  className="w-4 h-4 mx-0.5"
                />
              ))}
            </div>

            <h3 className="text-lg font-semibold text-center text-gray-800">
              {testimonial.name}
              { testimonial.role && ` - ${testimonial.role}`}
            </h3>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {testimonial.feedback}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
