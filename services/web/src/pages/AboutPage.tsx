export const AboutPage = () => {
  return (
    <div className="p-8">
      <div className="mb-6 h-96 flex flex-col justify-center items-center bg-gray-200 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4">Who We Are</h1>
        <p className="text-lg mb-6 text-center">
          At Marketeer, we are passionate about connecting businesses with their
          target audience through innovative marketing solutions. Our team of
          experts is dedicated to helping you grow your brand and reach new
          heights.
        </p>
      </div>
      <div className="mb-full flex flex-col gap-8 items-center md:flex-row mb-10">
        <img
          className="w-5/6 md:w-full rounded-lg shadow-md"
          src="https://nilepost.co.ug/new_cms/wp-content/uploads/2025/11/2261108d-b76b-43b1-bf23-7f9929806662.jpg"
          alt="Our Team"
        />
        <div className="md:ml-8">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            Our mission is to empower businesses of all sizes to succeed in the
            competitive market by providing top-notch marketing services that
            drive results.
          </p>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>Comprehensive market research and analysis</li>
        <li>Creative advertising campaigns</li>
        <li>Social media management and growth strategies</li>
        <li>Search engine optimization (SEO)</li>
        <li>Content creation and marketing</li>
      </ul>
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-lg">
        Ready to take your marketing to the next level? Contact us today to
        learn more about our services and how we can help your business thrive.
      </p>
    </div>
  );
};
