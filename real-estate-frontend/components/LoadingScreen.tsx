import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f261e]">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Logo */}
        <div className="relative animate-bounce">
          <Image
            src="/logo.svg"
            alt="ZAD Hills Logo"
            width={250}
            height={250}
            className="drop-shadow-lg"
            priority
          />
          {/* Loading spinner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-white/40 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">ZAD Hills</h2>
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Loading</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}