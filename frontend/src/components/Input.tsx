import type { ReactElement } from "react";

interface InputProps {
  reference?: any;
  placeholder?: string;
  icon?: ReactElement;
  type?: string;
  className?: string;
}

export function Input({ reference, placeholder, icon, type}: InputProps){
    return (
        <div className="mb-4 relative">
            {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {icon}
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} border-2 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200 `}
                ref={reference}
            />
        </div>
    )
}