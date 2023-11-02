import { Dna } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="dna-loader-wrapper">
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
