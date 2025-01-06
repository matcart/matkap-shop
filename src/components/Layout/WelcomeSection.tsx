interface WelcomeSectionProps {
  storeName: string | undefined;
}

const WelcomeSection = ({ storeName }: WelcomeSectionProps) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm ml-0 lg:ml-[39px]">
    <div className="flex flex-col md:flex-row h-[400px]">
      <div className="w-full md:w-1/2 h-48 md:h-full relative">
        <img
          src="/assets/images/welcome.png"
          alt="Welcome"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center text-center">
        <h2 className="text-ica-red text-base font-semibold mb-2">
          Välkommen till
        </h2>
        <h1 className="text-[25px] font-semibold text-gray-900">
          {storeName || 'Loading...'}
        </h1>
      </div>
    </div>
  </div>
);

export default WelcomeSection;