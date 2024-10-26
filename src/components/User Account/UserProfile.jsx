import React, {useState, useEffect} from 'react'

function UserProfile({personalInfo, setPersonalInfo, signupFormData}) {

    const [isEditing, setIsEditing] = useState(false);


	const handlePersonalInfoChange = (e) => {
        const {name, value} = e.target

        setPersonalInfo(prev => ({...prev, [name]: value}))
	}

	const handleSubmitForm = (e) => {
        e.preventDefault();
	}

    const toggleEditMode = () => {
        setIsEditing(prev => !prev);
    };

	return (
		<div className="text-left mt-4 max-sm:text-sm">
			<h1 className="md:text-3xl max-sm:text-xl max-sm:text-center font-bold my-6">Personal Information</h1>

			{/*<h4 className="mb-4 text-xl font-semibold opacity-60">About you</h4>*/}

			<form onSubmit={handleSubmitForm} action="" className="md:grid grid-cols-2 gap-x-4 relative pb-20">
				<div className="gap-y-4 flex flex-col">

					<div className="flex flex-col">
						<label htmlFor="full-name">Full Name</label>
						<input name="fullName" id="full-name" onChange={handlePersonalInfoChange} readOnly={!isEditing} value={personalInfo && personalInfo.fullName} type="text" placeholder="Enter your full name..." required className="border-[1px] p-2 mt-1 rounded-md focus:outline-orange-400  focus:border-[1px]"/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="birthday">Birthday</label>
						<input name="birthday" id="birthday" onChange={handlePersonalInfoChange} readOnly={!isEditing} value={personalInfo && personalInfo.birthday} type="date" placeholder="Enter your birthday..." required className="border-[1px] p-2 mt-1 rounded-md focus:outline-orange-400  focus:border-[1px]"/>
					</div>

					<div className="flex flex-col gap-x-4 max-md:gap-y-4">
							<label htmlFor="gender">Gender</label>
							<input name="gender" id="gender" onChange={handlePersonalInfoChange} readOnly={!isEditing} value={personalInfo &&  personalInfo.gender} type="text" placeholder="Enter your full name..." required className="border-[1px] p-2 mt-1 rounded-md focus:outline-orange-400  focus:border-[1px]"/>
					</div>
				</div>

				<div className="gap-y-4 flex flex-col max-md:mt-4">
					<div className="flex flex-col">
						<label htmlFor="phoneNumber">Phone Number</label>
						<input name="phoneNumber" id="phoneNumber" onChange={handlePersonalInfoChange} readOnly={!isEditing} value={personalInfo && personalInfo.phoneNumber} type="tel" placeholder="Enter your Phone Number..." className="border-[1px] p-2 mt-1 rounded-md focus:outline-orange-400  focus:border-[1px]"/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input name="email" id="email" onChange={handlePersonalInfoChange} readOnly={!isEditing} value={personalInfo &&  personalInfo.email} type="text" placeholder="Enter your email..." required className="border-[1px] p-2 mt-1 rounded-md focus:outline-orange-400  focus:border-[1px]"/>
					</div>
				</div>


				{
					isEditing
						? <button onClick={toggleEditMode} type="submit" className="absolute right-0 bottom-0 ml-auto bg-black text-white text-center py-3 px-8 w-fit rounded-md mt-8 border-none">Save</button>
						: <button onClick={toggleEditMode} type="button" className="absolute right-0 bottom-0 ml-auto bg-black text-white text-center py-3 px-8 w-fit rounded-md mt-8 border-none">Edit</button>
				}

			</form>


		</div>
	)
}

export default UserProfile