export default function FloatingPhoneButton() {
    return (
      <div className="fixed bottom-6 left-6">
        <a
          href="tel:+9040706-8883"
          className="bg-customRed p-4 rounded-full shadow-custom flex items-center justify-center hover:bg-customRed transition duration-300"
        >
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.62 10.79a15.91 15.91 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.72 11.72 0 0 0 3.7.59 1 1 0 0 1 1 1v3.79a1 1 0 0 1-1 1A19 19 0 0 1 3 5a1 1 0 0 1 1-1h3.79a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.7 1 1 0 0 1-.24 1.05l-2.2 2.2z"></path>
          </svg>
        </a>
      </div>
    );
  }
  