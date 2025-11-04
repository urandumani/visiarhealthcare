// @ts-ignore
const FormCard = ({ title, children }) => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormCard;
