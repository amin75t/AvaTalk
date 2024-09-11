import {BackIcon} from "../../Components";
import {useEffect, useState} from "react";
import ImageGallery from "react-image-gallery";
import {Button} from "symphony-ui";
import Modal from "react-modal";

export const NFCBusinessCard = () => {
    const [selectedColor, setSelectedColor] = useState([{color:'purple',count:1,id:0}]);
    const images = [
        {
            original: '/Carbon/Purple 1.png', // Path relative to public folder
            thumbnail: '/Carbon/Purple 1.png', // Optional thumbnail (can be the same image or different)
            description: '', // Optional description
        },
        {
            original: '/Carbon/whaote.png', // Another image
            thumbnail: '/Carbon/whaote.png',
            description: '',
        },
        {
            original: '/Carbon/black1.png', // Another image
            thumbnail: '/Carbon/black1.png',
            description: '',
        },
        {
            original: '/Carbon/gold 1.png', // Another image
            thumbnail: '/Carbon/gold 1.png',
            description: '',
        },
    ];
    useEffect(()=>{
        if(selectedColor.length==0){
            setSelectedColor([{color:'purple',count:1,id:0}]);
        }
    },[selectedColor])
const [isOpen, setIsOpen] = useState(false);
    const listColorBadge=["#5B21B6","#000000","#DBBB6A"]
    const handleQuantityChange = (action:string, id:number) => {
        setSelectedColor(prevColors =>
            prevColors
                .map(colorItem => {
                    if (colorItem.id === id) {
                        if (action === 'increment') {
                            return { ...colorItem, count: colorItem.count + 1 };
                        } else if (action === 'decrement') {
                            return { ...colorItem, count: colorItem.count - 1 };
                        }
                    }
                    return colorItem;
                })
                .filter(colorItem => colorItem.count > 0) // Remove items where count is 0 or less
        );
    };
    return (
        <div className=" w-full bg-[#FDFDFE] hiddenScrollBar h-dvh top-[0px]  z-[15]">
            <div className=" top-4">
                <BackIcon title="Avatalk NFC Business Card" theme="Carbon"></BackIcon>

            </div>
            <div
                className="md:max-w-full max-w-sm mx-auto p-4 rounded-lg  px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[10px]">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex w-full pb-16  ">
                        <ImageGallery
                            showThumbnails={true} // Ensure thumbnails are visible
                            thumbnailPosition="right" // Thumbnail position on the right
                            showPlayButton={false} // Disable slideshow button
                            showFullscreenButton={false} // Disable fullscreen button
                            items={images}
                            renderLeftNav={(onClick, disabled) => {
                                return (
                                    <div className={`Carbon-back-Button-container-box-NfcCard !top-[100%] w-fit flex items-end justify-end`} style={{transform: 'translate(30%, -50%)', left: '20%'}} data-mode="gallery">
                                        <Button onClick={onClick} disabled={disabled} theme={`Carbon-back`}>
                                            <div className={`Carbon-back-Button-vector`}></div>
                                        </Button>
                                    </div>
                                );
                            }}
                            renderRightNav={(onClick, disabled) => {
                                return (
                                    <div className={`Carbon-back-Button-container-box-NfcCard !top-[100%] flex items-start justify-start  w-fit`} style={{transform: 'translate(-30%, -50%)', right: '20%'}} data-mode="gallery">
                                        <Button onClick={onClick} disabled={disabled} theme={`Carbon-back`} style={{rotate: '180deg'}}>
                                            <div className={`Carbon-back-Button-vector`}></div>
                                        </Button>
                                    </div>
                                );
                            }}
                        />

                    </div>
                    <div className={"bg-white shadow-md w-full p-5 rounded-xl"}>
                        <h2 className="text-[14px] font-semibold text-[#374151]">
                            Avatalk NFC Business Card
                        </h2>
                        <div className="flex items-center mt-2">
                            <div className="flex text-[#9CA3AF] font-normal text-[16px]">price:<p
                                className={"text-purple-500 text-lg font-semibold"}>£7</p></div>
                        </div>
                        <div className="text-[#374151] font-normal text-[12px]">
                            Tax included. Shipping calculated at checkout.
                        </div>
                        {selectedColor.map(item=>{
                            return (
                                <div className="mt-4 flex justify-between items-center">
                                    <div className={"flex gap-3"}>
                                        {listColorBadge.map((color: string) => (
                                            <div className={`w-[32px] h-[32px] rounded-md bg-[${color}]`}>
                                            </div>
                                        ))}
                                    </div>


                                    <div className={"bg-[#EEEFF3] flex items-center justify-between px-2 w-[128px] h-[40px] rounded-2xl"}>
                                        <button  className={"bg-white text-[#5B21B6] w-8 h-8 rounded-full flex items-center justify-center"}  onClick={()=>handleQuantityChange("decrement",item.id)}>
                                            {item.count>1?
                                            "-":<img src={"/Carbon/trashVector.svg"}/>}
                                        </button>
                                        {item.count}
                                        <button  className={"bg-[#5B21B6] text-white w-8 h-8 rounded-full"} onClick={()=>handleQuantityChange("increment",item.id)}>+</button>

                                    </div>
                                </div>
                            )
                        })}

                        <p className={"text-[14px] cursor-pointer mt-5 font-medium text-[#5B21B6]"}
                           onClick={() => setSelectedColor((prv) => [ ...prv,{color:"purpule",count:1,id:prv.length+1}])}>+ Add New Color</p>
                    </div>

                </div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={() => {
                        setIsOpen(false)}
                }
                    style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "360px", background: "rgba(243, 244, 246, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
                    contentLabel=" Modal"
                >
                    <div className={"flex flex-col items-center justify-center"}>
                        <img src={"/Carbon/tick-circle.svg"}/>
                        <h1 className={"text-lg font-semibold"}>Your purchase</h1>
                        <p className={"text-lg font-semibold"}>has been successfully completed</p>
                    </div>
                </Modal>
                <Button onClick={()=>setIsOpen(true)} className="mt-4 w-full bg-[#5B21B6] text-white py-2 px-4 rounded-full">
                    Checkout
                </Button>
                <div className="mt-4">
                    <details className="mb-2 cursor-pointer bg-[#F3F4F6] rounded-3xl text-[14px] font-bold text-[#374151] px-4 py-2">
                        <summary className=" text-[#374151] font-normal text-[12px]">Description</summary>
                        <p className="text-[#6B7280] font-normal mt-2 text-[12px]">
                            Revolutionize Your Networking with the Avatalk NFC Business Card
                            Step into the future of professional networking with the Avatalk NFC Business Card, a cutting-edge tool designed to transform how you connect with others. This isn’t just another business card—it’s an AI-powered networking assistant embedded within a sleek, modern design. The Avatalk NFC Business Card goes beyond traditional contact sharing, offering a comprehensive digital experience that captivates, engages, and leaves a lasting impression.
                        </p>
                    </details>
                    <details className="mb-2 cursor-pointer bg-[#F3F4F6] rounded-3xl text-[14px] font-bold text-[#374151] px-4 py-2">
                        <summary className=" text-[#374151] font-normal text-[12px]">Key Features</summary>
                        <p className="text-[#6B7280] font-normal mt-2 text-[12px]">Key features of the product.</p>
                    </details>
                    <details className="mb-2 cursor-pointer bg-[#F3F4F6] rounded-3xl text-[14px] font-bold text-[#374151] px-4 py-2">
                        <summary className=" text-[#374151] font-normal text-[12px]">Why Choose this Product?</summary>
                        <p className="text-[#6B7280] font-normal mt-2 text-[12px]">
                            Reasons why this product is a great choice.
                        </p>
                    </details>
                </div>
            </div>

        </div>
    );
};

