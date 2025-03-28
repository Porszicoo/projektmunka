export const Footer = () => {
  return (
    <footer className="bg-black w-full h-80">
      <div className="max-w-screen-xl px-4 py-6 mx-auto space-y-6 sm:space-y-8 sm:px-6 lg:px-8">
        
        {/* Navigációs linkek */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a href="/" className="text-sm sm:text-base text-white hover:text-gray-300">
            Kezdőoldal
          </a>
          <a href="/rolunk" className="text-sm sm:text-base text-white hover:text-gray-300">
            Rólunk
          </a>
          <a href="/partnerek" className="text-sm sm:text-base text-white hover:text-gray-300">
            Partnereink
          </a>
          <a href="/webshop" className="text-sm sm:text-base text-white hover:text-gray-300">
            Webshop
          </a>
          <a href="/kapcsolat" className="text-sm sm:text-base text-white hover:text-gray-300">
            Kapcsolat
          </a>
        </nav>

        {/* Social ikonok */}
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <a href="https://www.facebook.com/" className="text-white hover:text-gray-300">
            <span className="sr-only">Facebook</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89h2.238v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
            </svg>
          </a>
          <a href="https://www.instagram.com/" className="text-white hover:text-gray-300">
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm8.5 1.5a4.25 4.25 0 014.25 4.25v8.5a4.25 4.25 0 01-4.25 4.25h-8.5a4.25 4.25 0 01-4.25-4.25v-8.5a4.25 4.25 0 014.25-4.25h8.5zM12 7.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm0 1.5a3.25 3.25 0 110 6.5 3.25 3.25 0 010-6.5zm5.25-2a1 1 0 100 2 1 1 0 000-2z"></path>
            </svg>
          </a>
          <a href="https://x.com/" className="text-white hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646A4.118 4.118 0 0019.738 4a8.224 8.224 0 01-2.605.996A4.107 4.107 0 008.29 9.743a11.65 11.65 0 01-8.457-4.287A4.106 4.106 0 003.292 9.713 4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022A4.095 4.095 0 014.239 14.21a4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a href="https://github.com/" className="text-white hover:text-gray-300">
            <span className="sr-only">Github</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855v2.747c0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
          </a>
        </div>

        {/* Copyright szöveg */}
        <p className="text-xs sm:text-sm text-center text-white">
          © 2024 TrendTees, Inc. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
};
