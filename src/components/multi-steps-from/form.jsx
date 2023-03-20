import { useEffect, useState } from "react";
import "../../assets/css/multi-steps.scss";
import ButtonSteps from "./button-steps";
import Gallery from "./Gallery";
import Headersteps from "./header-steps";
import LocationSteps from "./locationForm";
import Overview from "./overviewFrom";
import Publish from "./publishForm";

export default function Form() {

    // all steps
    const [steps , setSteps] = useState([
        {label : "Overview" , stepName : "overview" , index : 0 , completd : false},
        {label : "Location" , stepName : "location" , index : 1 , completd : false},
        {label : "Gallery" , stepName : "gallery" , index : 2 , completd : false},
        {label : "Publish" , stepName : "publish" , index : 3 , completd : false}
    ]) 

    const [activeStep , setActiveStep] = useState(0)
    const [stepsPass , setStepsPass] = useState([steps[0].stepName])
    const [stepsCompleted , setStepsCompleted] = useState([])
    const [loadStatus , setLoadStatus] = useState(false)

    // overview step (first step)
    let [overviewData ,  setOverviewData] = useState({
        itemName : { value : "" , valid : false , errorMsg : ""} ,
        itemType : { value : "found" , valid : true , errorMsg : ""} ,
        itemCategory : { value : "wallet" , valid : true , errorMsg : ""} ,
        itemDate : { value : "" , valid : false , errorMsg : ""} ,
        itemDesc : { value : "" , valid : false , errorMsg : ""} ,
        ItemBrand : { value : "" , valid : false , errorMsg : ""}
    })

    // location step (seconde step)
    let [locationData ,  setLocationData] = useState({
        place : { value : "Taxi" , valid : true , errorMsg : ""} ,
        address : { value : "" , valid : false , errorMsg : ""} ,
        zipCode : { value : "" , valid : false , errorMsg : ""} ,
    })

    // image step (third step)
    let [galleryData ,  setGalleryData] = useState({dataImg : {value : null}})

    // handel increment clicks
    let handelStepsInc  = () => {

        // check if step is completed
        if (steps[activeStep].completd !== true) return;

        // load animation
        setLoadStatus(true)

        // loading
        setTimeout(() => {
        if (steps[activeStep].stepName !== "publish") {
            setLoadStatus(false)
            let currentStep = activeStep
            
            // StepsPass
            currentStep += 1
            let currentStepsPass;
            
            if (!stepsPass.includes(steps[currentStep].stepName)) {
                currentStepsPass = [...stepsPass , steps[currentStep].stepName]
                setStepsPass(currentStepsPass)

                // StepsCompleted
                let currenStepsCompleted = [...stepsPass , steps[currentStep].stepName]
                setStepsCompleted(currenStepsCompleted)
            }
            

            setActiveStep(currentStep)
            setLoadStatus(false)
            }
        } , 1000)

    }
    
    // handel decrementer clicks
    let handelStepsDec = () => {
        if (activeStep !== 0) {
            let currentStep = activeStep
            currentStep -= 1
            stepsPass.pop()
            
            setStepsPass(stepsPass)
            setActiveStep(currentStep)
        }
    }

    // handel random clicks
    let handelStepsClick = (index) => {
        if (!stepsCompleted.includes(steps[index].stepName)) return;
        setActiveStep(index);
    }

    let handelOver_Submit = () => {

        let currentData = {...overviewData}
        let stepValid = true;

        for (let dataValue in currentData) {
            if (currentData[dataValue].value === "" && currentData[dataValue].errorMsg === "") {
                stepValid = false
                currentData[dataValue].errorMsg = "this field is required";
            } else if (currentData[dataValue].valid === false) {
                stepValid = false
            }
            else {
                currentData[dataValue].errorMsg = "";
            }
        }
        setOverviewData(currentData);

        return stepValid;
    }

    let handelLocation_Submit = () => {

        let currentData = {...locationData}
        let stepValid = true;

        for (let dataValue in currentData) {
            if (currentData[dataValue].value === "" && currentData[dataValue].errorMsg === "") {
                stepValid = false
                currentData[dataValue].errorMsg = "this field is required";
            } else if (currentData[dataValue].valid === false) {
                stepValid = false
            }
            else {
                currentData[dataValue].errorMsg = "";
            }
        }
        setLocationData(currentData);

        return stepValid;
    }

    let handelGallery_Submit = () => {
        let stepValid = true;
        return stepValid;
    }


    let handelPublish_Submit = () => {
        let dataForm = {...overviewData , ...locationData , ...galleryData}
        let dataFromSend = {}

        for (let Prop in dataForm) {
            let { value } = dataForm[Prop] ;
            dataFromSend[Prop] = value
        }

        alert("secusess")
        console.log(dataFromSend)
    }

    let handelSubmitStep = () => {
        if (steps[activeStep].stepName === "overview") {
            if (handelOver_Submit() === true) {
                let currentDataSteps = [...steps];
                currentDataSteps[activeStep].completd = true;
                setSteps(currentDataSteps);
                // send to next step
                handelStepsInc()
            }
        }
        if (steps[activeStep].stepName === "location") {
            if (handelLocation_Submit() === true) {
                let currentDataSteps = [...steps];
                currentDataSteps[activeStep].completd = true;
                setSteps(currentDataSteps);
                // send to next step
                handelStepsInc()
            }
        }
        if (steps[activeStep].stepName === "gallery") {
            if (handelGallery_Submit() === true) {
                let currentDataSteps = [...steps];
                currentDataSteps[activeStep].completd = true;
                setSteps(currentDataSteps);
                // send to next step
                handelStepsInc()
            }
        }
        if (steps[activeStep].stepName === "publish") {
            if (handelOver_Submit() === true && handelLocation_Submit() === true && handelGallery_Submit() === true) {
                handelPublish_Submit()
            } else {
                if (!handelOver_Submit()) {
                    setActiveStep(0)
                }
                else if (!handelLocation_Submit()) {
                    setActiveStep(1)
                    
                }
                else if (!handelGallery_Submit()) {
                    setActiveStep(2)
                }
            }
        }
    }

    return (
        <>
        {loadStatus === true &&
            <div className="spiner-steps">
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
            </div>
            }
            <Headersteps {...{steps , stepsCompleted , activeStep , handelStepsClick}} />
            <div className="col-md-12 pt-4">
                    {steps[activeStep].stepName === "overview" && <Overview {...{overviewData , setOverviewData}}/>}
                    {steps[activeStep].stepName === "location" && <LocationSteps {...{locationData , setLocationData}} />}
                    {steps[activeStep].stepName === "gallery" && <Gallery {...{galleryData , setGalleryData}}/>}
                    {steps[activeStep].stepName === "publish" && <Publish />}
                </div>
                <ButtonSteps {...{handelStepsDec , stepsPass , activeStep , steps , handelSubmitStep}} />
        </>
    );
}
