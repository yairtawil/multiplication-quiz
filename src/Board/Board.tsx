export enum BoardSize {
  Small = 16,
  Medium = 32,
  Large = 64,
  SuperLarge = 128,
}

const Board = ({ size }: { size: BoardSize }) => {
  return (
    <div>
      <h1>Board</h1>

      <div>
        {Array.from({ length: size }, (_, i) => (
          <div key={i}>
            {Array.from({ length: size }, (_, j) => (
              <div
                key={j}
                style={{
                  display: 'inline-block',
                  width: 20,
                  height: 20,

                  border: '1px solid black',
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
