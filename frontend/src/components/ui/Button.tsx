import type { ReactElement } from "react";

interface ButtonProps{
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;

}

const variantStyles = {
    "primary": "bg-blue-600 text-white",
    "secondary": "bg-blue-300 text-blue-600"
}

const sizeStyles = {
    "sm": "py-2 px-3",
    "md": "py-2 px-5",
    "lg": "py-2 px-7 "
}

const defaultStyles = "flex gap-2 rounded-lg text-lg items-center justify-center text-xl cursor-pointer"

export const Button = (props: ButtonProps) => {
  return (
    <button 
      onClick={props.onClick} 
      className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullWidth ? "w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45" : ""}`} disabled={props.loading}>
        {props.loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
        {props.startIcon? <div className="pr-2">{props.startIcon}</div>: null}
        {props.text}
        {props.endIcon ? props.endIcon: null}
    </button>
  )
}
