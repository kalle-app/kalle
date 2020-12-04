import { forwardRef } from "react"

const Button = forwardRef<HTMLButtonElement, JSX.IntrinsicElements["button"]>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      onClick={props.onClick}
      className={
        props.className +
        " inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      }
    />
  )
})

export default Button
