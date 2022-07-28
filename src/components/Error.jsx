import styled from "@emotion/styled"

const Texto = styled.div`
    color: #B7322C;
    background-color: #fff;
    padding: 10px;
    font-size: 20px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
`

const Error = ({message}) => {
  return (
    <Texto>
        {message}
    </Texto>
  )
}

export default Error