// Define the types for the data structures
export interface Guest {
  name: string;
  isCouple: boolean;
  isFamily?: boolean;
  plusOneAllowed?: boolean;
  attending: string[];
}

export interface RsvpPerson {
  attending: boolean;
  food: string;
  allergies: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
}

export interface RsvpFormType {
  [guestName: string]: {
    [personName: string]: RsvpPerson;
  };
}

export const guestsData: Guest[] = [
  {
    name: "John Smith",
    isCouple: true,
    attending: ["John Smith", "Jane Doe"]
  },
  {
    name: "The Williams Family",
    isFamily: true,
    attending: ["Mike Williams", "Sarah Williams", "Sam Williams", "Lily Williams"],
    plusOneAllowed: true,
    isCouple: false
  },
  {
    name: "Emily Clark",
    isCouple: false,
    attending: ["Emily Clark"],
    plusOneAllowed: true
  },
  {
    name: "Michael Chen",
    isCouple: false,
    attending: ["Michael Chen"],
    plusOneAllowed: false
  }
];

export const foodOptions: string[] = [
  "Chicken",
  "Beef",
  "Fish",
  "Vegetarian",
  "Vegan"
];

const FormSection = ({
  selectedGuest,
  setSelectedGuest,
  rsvpForm,
  setRsvpForm,
  setIsAlertVisible,
}: {
  selectedGuest: Guest | null;
  setSelectedGuest: (guest: Guest | null) => void;
  rsvpForm: RsvpFormType;
  setRsvpForm: (form: RsvpFormType) => void;
  setIsAlertVisible: (visible: boolean) => void;
}) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, person: string, field: keyof RsvpPerson) => {
    const { value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setRsvpForm(prevForm => ({
      ...prevForm,
      [selectedGuest?.name!]: {
        ...prevForm[selectedGuest?.name!],
        [person]: {
          ...prevForm[selectedGuest?.name!]?.[person],
          [field]: type === 'checkbox' ? checked : value,
        },
      },
    }));
  };

  const handleGuestSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const guestName = e.target.value;
    const guest = guestsData.find(g => g.name === guestName);
    setSelectedGuest(guest || null);

    if (guest && !rsvpForm[guest.name]) {
      const initialRsvp: { [key: string]: RsvpPerson } = {};
      guest.attending.forEach(person => {
        initialRsvp[person] = { attending: true, food: '', allergies: '', email: '', phone: '' };
      });
      if (guest.plusOneAllowed) {
        initialRsvp['Plus One'] = { attending: false, food: '', allergies: '', email: '', phone: '', firstName: '', lastName: '' };
      }
      setRsvpForm(prevForm => ({
        ...prevForm,
        [guest.name]: initialRsvp,
      }));
    }
  };

  const handlePlusOneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (!selectedGuest) return;

    if (checked) {
      setRsvpForm(prevForm => ({
        ...prevForm,
        [selectedGuest.name]: {
          ...prevForm[selectedGuest.name],
          'Plus One': { attending: true, food: '', allergies: '', email: '', phone: '', firstName: '', lastName: '' },
        },
      }));
    } else {
      setRsvpForm(prevForm => {
        const newRsvp = { ...prevForm[selectedGuest.name] };
        delete newRsvp['Plus One'];
        return {
          ...prevForm,
          [selectedGuest.name]: newRsvp,
        };
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!selectedGuest) return;

      console.log("Form Submitted:", rsvpForm[selectedGuest.name]);
      setIsAlertVisible(true);
  };

  return (
    <section id="rsvp" className="">
      <h2 className="text-3xl font-bold text-center mb-8 font-horley text-[#f2df93ff]">Kindly RSVP</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 bg-gray-900 p-8 rounded shadow-lg">
        <div>
          <label htmlFor="guestName" className="block text-sm font-medium text-gray-300 mb-2">Select your name</label>
          <select
            id="guestName"
            name="guestName"
            className="w-full p-3 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-[#f7fbfc]"
            onChange={handleGuestSelect}
            required
          >
            <option className="bg-gray-800 text-[#f7fbfc]" value="">-- Please select a name --</option>
            {guestsData.map((guest, index) => (
              <option className="bg-gray-800 text-[#f7fbfc]" key={index} value={guest.name}>{guest.name}</option>
            ))}
          </select>
        </div>

        {selectedGuest && (
          <div className="space-y-8">
            {/* Attending Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedGuest.attending.map((person, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-800 p-4 rounded border border-gray-700">
                  <input
                    type="checkbox"
                    id={person.replace(/\s/g, "")}
                    name={person}
                    checked={rsvpForm[selectedGuest.name]?.[person]?.attending || false}
                    onChange={(e) => handleInputChange(e, person, 'attending')}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={person.replace(/\s/g, "")} className="text-sm font-medium text-gray-300">{person} is attending</label>
                </div>
              ))}
              {selectedGuest.plusOneAllowed && (
                <div className="flex items-center space-x-2 bg-gray-800 p-4 rounded border border-gray-700">
                  <input
                    type="checkbox"
                    id="plusOne"
                    name="plusOne"
                    checked={rsvpForm[selectedGuest.name]?.['Plus One']?.attending || false}
                    onChange={handlePlusOneChange}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="plusOne" className="text-sm font-medium text-gray-300">Plus One</label>
                </div>
              )}
            </div>

            {/* Individual/Plus One Fields */}
            <div className="space-y-8">
              {Object.keys(rsvpForm[selectedGuest.name] || {}).map((person, index) => (
                (rsvpForm[selectedGuest.name][person]?.attending) && (
                  <div key={index} className="p-6 bg-gray-800 rounded shadow-inner space-y-4">
                    <h4 className="text-lg font-bold font-horley text-[#f2df93ff]">{person}</h4>
                    {person === 'Plus One' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                          value={rsvpForm[selectedGuest.name]?.[person]?.firstName || ''}
                          onChange={(e) => handleInputChange(e, person, 'firstName')}
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                          value={rsvpForm[selectedGuest.name]?.[person]?.lastName || ''}
                          onChange={(e) => handleInputChange(e, person, 'lastName')}
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`${person}-food`} className="block text-xs font-medium text-gray-400 mb-1">Food Selection</label>
                        <select
                          id={`${person}-food`}
                          className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc]"
                          value={rsvpForm[selectedGuest.name]?.[person]?.food || ''}
                          onChange={(e) => handleInputChange(e, person, 'food')}
                        >
                          <option className="bg-gray-800 text-[#f7fbfc]" value="">-- Select an option --</option>
                          {foodOptions.map((food, foodIndex) => (
                            <option className="bg-gray-800 text-[#f7fbfc]" key={foodIndex} value={food}>{food}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`${person}-allergies`} className="block text-xs font-medium text-gray-400 mb-1">Allergies</label>
                        <textarea
                          id={`${person}-allergies`}
                          rows="1"
                          placeholder="e.g., Peanuts, dairy..."
                          className="w-full p-3 border border-gray-700 rounded resize-none bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                          value={rsvpForm[selectedGuest.name]?.[person]?.allergies || ''}
                          onChange={(e) => handleInputChange(e, person, 'allergies')}
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`${person}-email`} className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        id={`${person}-email`}
                        placeholder="you@example.com"
                        className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                        value={rsvpForm[selectedGuest.name]?.[person]?.email || ''}
                        onChange={(e) => handleInputChange(e, person, 'email')}
                      />
                    </div>
                    <div>
                      <label htmlFor={`${person}-phone`} className="block text-xs font-medium text-gray-400 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id={`${person}-phone`}
                        placeholder="555-555-5555"
                        className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                        value={rsvpForm[selectedGuest.name]?.[person]?.phone || ''}
                        onChange={(e) => handleInputChange(e, person, 'phone')}
                      />
                    </div>
                  </div>
                )
              ))}
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Submit RSVP</button>
          </div>
        )}
      </form>
    </section>
  );
};

export default FormSection;