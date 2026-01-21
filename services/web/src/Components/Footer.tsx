export const Footer = () => {
  return (
    <div className="bg-green-700 text-white p-4 h-40">
      <p className="text-center text-xl">&copy; {new Date().getFullYear()} Marketeer. All rights reserved.</p>
      <nav>
        <ul className="flex justify-center space-x-4 mt-2">
          <li><a href="#" className="hover:text-blue-700 text-xl">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-700 text-xl">Terms of Service</a></li>
          <li><a href="#" className="hover:text-blue-700 text-xl">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  )
}
