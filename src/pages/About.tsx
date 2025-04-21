
import { Sun, Users, ShieldCheck, BarChart4, Leaf, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-solar-darkblue to-solar-blue text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Sun className="h-16 w-16 text-solar-yellow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About WattShare</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Connecting solar enthusiasts and making sustainable energy more accessible for everyone.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,128L80,117.3C160,107,320,85,480,96C640,107,800,149,960,149.3C1120,149,1280,107,1360,85.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At WattShare, we believe that sustainable energy should be accessible to everyone. Our mission is to create a vibrant marketplace where solar enthusiasts, homeowners, businesses, and installers can connect to buy and sell solar equipment at fair prices.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                By facilitating the exchange of new, used, and refurbished solar products, we're helping to:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Leaf className="h-6 w-6 text-solar-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduce waste by extending the lifespan of solar equipment</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-solar-blue mr-2 flex-shrink-0 mt-0.5" />
                  <span>Make solar technology more affordable for those on a budget</span>
                </li>
                <li className="flex items-start">
                  <Sun className="h-6 w-6 text-solar-yellow mr-2 flex-shrink-0 mt-0.5" />
                  <span>Accelerate the transition to renewable energy worldwide</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Solar panels on a sunny day" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Story */}
      <section className="py-16 bg-solar-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Our team working together" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                WattShare was founded in 2022 by a group of solar enthusiasts who recognized a gap in the market. While searching for affordable solar equipment for their own projects, they discovered how difficult it was to find quality used or surplus solar products.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                They envisioned a platform where anyone could easily buy and sell solar equipment—from individual panels to complete systems—creating a circular economy that benefits both people and the planet.
              </p>
              <p className="text-lg text-gray-700">
                Today, WattShare has grown into a thriving community of solar adopters, DIY enthusiasts, professional installers, and manufacturers, all united by our passion for sustainable energy.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-solar-yellow inline-flex rounded-full p-3 mb-4">
                <ShieldCheck className="h-8 w-8 text-solar-darkblue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Safety</h3>
              <p className="text-gray-700">
                We prioritize creating a secure marketplace with verified users and secure transactions to protect our community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-solar-green inline-flex rounded-full p-3 mb-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-700">
                Every transaction on WattShare contributes to a more sustainable future by extending the life of solar products.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-solar-blue inline-flex rounded-full p-3 mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-700">
                We foster a supportive community where knowledge is shared and solar adoption is encouraged.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-solar-darkblue inline-flex rounded-full p-3 mb-4">
                <BarChart4 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-gray-700">
                We believe in clear, honest communication about product conditions, pricing, and marketplace operations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-solar-yellow inline-flex rounded-full p-3 mb-4">
                <Sun className="h-8 w-8 text-solar-darkblue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-700">
                We continuously improve our platform to better serve the evolving needs of the solar community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-solar-blue inline-flex rounded-full p-3 mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Education</h3>
              <p className="text-gray-700">
                We're committed to helping people learn about solar energy through resources, guides, and community support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-solar-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2f9296e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Michael Johnson" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Michael Johnson</h3>
                <p className="text-solar-blue mb-2">CEO & Co-Founder</p>
                <p className="text-gray-600 text-sm">
                  A solar industry veteran with over 15 years of experience in renewable energy.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Sarah Chen" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Sarah Chen</h3>
                <p className="text-solar-blue mb-2">CTO & Co-Founder</p>
                <p className="text-gray-600 text-sm">
                  A tech innovator passionate about sustainable energy solutions and digital marketplaces.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="David Rodriguez" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">David Rodriguez</h3>
                <p className="text-solar-blue mb-2">Head of Operations</p>
                <p className="text-gray-600 text-sm">
                  Ensures our marketplace runs smoothly and provides excellent user experiences.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Emily Taylor" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Emily Taylor</h3>
                <p className="text-solar-blue mb-2">Community Manager</p>
                <p className="text-gray-600 text-sm">
                  Builds and nurtures our growing community of solar enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-solar-darkblue to-solar-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're looking to buy, sell, or simply learn more about solar energy, WattShare is here to help you on your journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-solar-yellow text-black hover:bg-solar-yellow/90 text-lg px-8 py-6"
            >
              <a href="/explore">Browse Listings</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-700 mb-6">
                Have questions, suggestions, or feedback? We'd love to hear from you. Fill out the form or use our contact information below.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-solar-lightgray p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-solar-darkblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-solar-lightgray p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-solar-darkblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">info@wattshare.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-solar-lightgray p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-solar-darkblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-gray-600">123 Solar Street</p>
                    <p className="text-gray-600">Sunshine City, SC 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solar-blue"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solar-blue"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solar-blue"
                    placeholder="Subject of your message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solar-blue"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <Button className="w-full bg-solar-blue text-white hover:bg-solar-blue/90 py-3">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
