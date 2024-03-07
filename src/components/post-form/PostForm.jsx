import React, { useCallback } from 'react'
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "../index"
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                status: post?.status || "active",
            }
        }
    )
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    // const submit = async (data) => {
    //     if (post) {
    //         // post hai then update it
    //         // first upload the file 
    //         // so image hai agar 
    //         const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

    //         //! post tha aleardy tha so ek image delete bhi  karni hogi 
    //         if (file) {
    //             appwriteService.deleteFile(post.featuredImage)
    //         }
    //         const dbPost = await appwriteService.updatePost(
    //             post.$id, {
    //             ...data,
    //             featuredImage: file ? file.$id : undefined,
    //         });
    //         // agar DB post agya hai then user ko navigate kara do
    //         if (dbPost) {
    //             navigate(`/post/${dbPost.$id}`);
    //         }
    //     }
    //     else {
    //         // post nhi hai or kuch update karney ko nhi hai 
    //         // user want to create new file 
    //         const file = await appwriteService.uploadFile(data.image[0]);

    //         if (file) {
    //             const fileId = file.$id
    //             data.featuredImage = fileId// data ki featured image ki updatation
    //             const dbPost = await appwriteService.createPost({
    //                 ...data, // spread out reason jo bhi forms baney gey waha kabhi bhi hamerey pass user data nhi hoga
    //                 userId: userData.$id // userData comes from store 
    //             });

    //             // agar post hai then redirect the user 
    //             if (dbPost) {
    //                 navigate(`/post/${dbPost.$id}`);
    //             }
    //         }

    //     }


    // }

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, [])
    //! we have two input fileds title and slag user type on title when user press space in slug it convert into dash(-)
    //? ^ negate in regex means isko mat match karna like "^a-zA-Z\d\s" these value ko neglect kar diya
    // ^ inko chor key saari values match kar lo 


    React.useEffect(()=>{
        const subscription = watch((value,{name})=>{
          if(name === 'title'){
            setValue('slug',slugTransform(value.title,),{shouldValidate:true});
          }  
        })

        return () => subscription.unsubscribe();
        // use for optimazation 
        // method ko optimization , returnkey ander callback 


    },[watch,slugTransform,setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
            </form>
    );
}

export default PostForm
// watch -> kisi filed ko continously mointer karna tho hum watch kar shaktey hai 
// getValues-> form ki values ko grab kar shkatey hai
// ? for default values first we need to get the information  like by defaulr status active

// ! if user submitted the form means user has passed some data
// if post value hai already then update it else create a new entry


// ! agar post hai tho new file upload aur purani file delete hogayi hai

// slug == post.$id

//? post ko DB mey update kar do 