import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import AccountVarificationForm from "./AccountVarificationForm";
import { VerifiedIcon } from "lucide-react";
import {
  enableTwoStepAuthentication,
  verifyOtp,
} from "@/State/Auth/Action";

const fields = [
  "fullName",
  "dateOfBirth",
  "nationality",
  "address",
  "city",
  "postcode",
  "country",
];

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleToggleEdit = () => {
    if (editMode) {
      localStorage.setItem("profileData", JSON.stringify(profileData));
    }
    setEditMode(!editMode);
  };

  const handleEnableTwoStepVerification = (otp) => {
    dispatch(
      enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp })
    );
  };

  const handleVerifyOtp = (otp) => {
    dispatch(verifyOtp({ jwt: localStorage.getItem("jwt"), otp }));
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[80%]">
        <Card>
          <CardHeader className="pb-6">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <label>Email:</label>
                  <p className="text-gray-500 bg-muted px-3 py-2 rounded">
                    {auth.user?.email}
                  </p>
                </div>
                {fields.slice(0, 3).map((field) => (
                  <div key={field}>
                    <label className="capitalize">
                      {field.replace(/([A-Z])/g, " $1")}:
                    </label>
                    <Input
                      className="bg-[#1f1f1f] text-white border border-gray-600"
                      name={field}
                      value={profileData[field]}
                      disabled={!editMode && field !== "nationality"}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-5">
                {fields.slice(3).map((field) => (
                  <div key={field}>
                    <label className="capitalize">
                      {field.replace(/([A-Z])/g, " $1")}:
                    </label>
                    <Input
                      className="bg-[#1f1f1f] text-white border border-gray-600"
                      name={field}
                      value={profileData[field]}
                      disabled={!editMode}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={handleToggleEdit}>
                {editMode ? "Save Profile" : "Edit Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>

                {auth.user.twoFactorAuth?.enaled ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon /> <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <Dialog>
                <DialogTrigger>
                  <Button>Enable Two Step Verification</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Verify your account
                    </DialogTitle>
                  </DialogHeader>
                  <AccountVarificationForm
                    handleSubmit={handleEnableTwoStepVerification}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
