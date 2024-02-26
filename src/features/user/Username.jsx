import { useSelector } from 'react-redux';

function Username() {
  const { userName } = useSelector((store) => store.user);

  return (
    <div className=" hidden text-sm font-semibold md:block">{userName}</div>
  );
}

export default Username;
