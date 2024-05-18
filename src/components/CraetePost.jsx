// @ts-nocheck
import { CirclePlus, TrashIcon } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../contexts/authContext";
import { useToast } from "../../@/components/ui/use-toast";
import { Progress } from "../../@/components/ui/progress";
import { db, storage } from "../firebase/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Textarea } from "../../@/components/ui/textarea";

export function CreatePost({ open, handleOpenChange }) {
  const { toast } = useToast();
  const { userLoggedIn, currentUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles?.[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Selcet File to upload",
      });
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `files/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            const post = {
              timestamp: Date.now(),
              caption: caption,
              imageUrl: downloadURL,
              email: currentUser?.email,
              usename: currentUser?.displayName,
            };
            await addDoc(collection(db, "posts"), {
              post,
            });

            setUploading(false);
            setSelectedFile(null);
            setProgress(0);
            setCaption("");
            handleOpenChange();
          })
          .catch((error) => {
            console.error("error while uploading image", error);
            setUploading(false);
          });
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {userLoggedIn ? (
            <>
              <DialogTitle> Upload File </DialogTitle>
              <DialogDescription>
                <Card>
                  <CardContent>
                    <div
                      className={`h-[200px] flex items-center justify-center border-none ${
                        uploading && "pointer-events-none opacity-70"
                      }`}
                    >
                      {selectedFile ? (
                        <div className=" w-full flex justify-between items-center">
                          <Label> {selectedFile?.name} </Label>
                          <TrashIcon
                            className="cursor-pointer"
                            onClick={() => setSelectedFile(null)}
                          />
                        </div>
                      ) : (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <p className="text-center text-lg">
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <Textarea
                      id="content"
                      placeholder="What's in your mind..."
                      onChange={(e) => setCaption(e.target.value)}
                      value={caption}
                      disabled={uploading}
                    />
                  </CardContent>
                </Card>
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle> Require Login </DialogTitle>
            </>
          )}
        </DialogHeader>

        <DialogFooter>
          {userLoggedIn ? (
            <div className="w-full">
              {uploading ? (
                <Progress value={progress} className="w-full my-4" />
              ) : null}
              <Button
                disabled={!selectedFile || uploading}
                className="w-full"
                onClick={handleUpload}
              >
                {uploading ? "Uploading.." : "Upload"}
              </Button>
            </div>
          ) : (
            <div className="w-full">
              <Button className="w-full" asChild>
                <Link to="/auth/signin"> Signin </Link>
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
