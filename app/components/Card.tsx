interface CardProps {
  children: any
}

const Card = (props: CardProps) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-5 sm:p-6">
      {props.children}
    </div>
  )
}

export default Card
