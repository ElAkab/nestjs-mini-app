// User profile page
import { useEffect, useState } from "react";
import { getProfile } from "../api/profile";

type UserProfile = {
	email: string;
	createdAt: string;
};

export default function Profile() {
	const [profile, setProfile] = useState<UserProfile | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					alert("No token found, please log in.");
					return;
				}

				const response = await getProfile(token);
				console.log("Profile data:", response.data);
				setProfile(response.data);
			} catch (error) {
				console.error("Failed to fetch profile:", error);
				alert("Failed to fetch profile. Please try again.");
			}
		};
		fetchProfile();
	}, []);

	if (!profile) {
		return (
			<div>
				<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-2xl font-semibold mb-4 text-gray-800">
							User Information
						</h2>
						<div className="space-y-2">
							<div>
								<span className="font-medium">Username:</span>{" "}
								<span className="text-gray-600">-</span>
							</div>
							<div>
								<span className="font-medium">Bio:</span>{" "}
								<span className="text-gray-600">-</span>
							</div>
							<div>
								<span className="font-medium">Age:</span>{" "}
								<span className="text-gray-600">-</span>
							</div>
							<div>
								<span className="font-medium">Vaccinated:</span>{" "}
								<span className="text-gray-600">-</span>
							</div>
							<div>
								<span className="font-medium">Role:</span>{" "}
								<span className="text-gray-600">guest</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
			<h1 className="text-4xl font-bold text-gray-800 mb-6">User Profile</h1>
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<p className="text-lg">
					<strong>Email:</strong> {profile.email}
				</p>
				<p className="text-lg">
					<strong>Member since:</strong>{" "}
					{new Date(profile.createdAt).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
