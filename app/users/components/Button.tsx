type ButtonProps = {
  children: any
  action: () => any
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type="submit"
      onClick={props.action}
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {props.children}
    </button>
  )
}

export default Button
