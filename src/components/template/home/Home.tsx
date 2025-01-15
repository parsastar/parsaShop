import { Clock, Mail, Phone, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-4xl my-10 mx-auto p-6 bg-white  rounded-lg">

      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <h2 className="text-xl font-bold mb-6 text-center">To get Credit Contact Admin with +98 939129392</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2" /> Working Hours
          </h2>
          <ul className="space-y-2">
            <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 10:00 AM - 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Phone className="mr-2" /> +1 (555) 123-4567
            </li>
            <li className="flex items-center">
              <Mail className="mr-2" /> info@example.com
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MapPin className="mr-2" /> Address
        </h2>
        <p>123 Business Street, Suite 100, City, State 12345, Country</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Our Company</h2>
        <p className="text-gray-600">
          We are a dedicated team of professionals committed to delivering
          high-quality products and services to our customers. With years of
          experience in the industry, we strive to exceed expectations and build
          lasting relationships with our clients. Our mission is to innovate,
          inspire, and make a positive impact in everything we do.
        </p>
      </div>
    </div>
  );
}
