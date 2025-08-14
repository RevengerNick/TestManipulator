const Field = ({ value }: { value: string }) => {

    return (
        <div className="flex flex-col bg-gray-200 rounded shadow border-1 size-24   ">
            <div className="flex justify-center items-center h-full w-full">{value}</div>
        </div>
    );
};

export default Field;
