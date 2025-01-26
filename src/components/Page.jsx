import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Navbar from "./Navbar"
import Student_Details from "./Student_Details"
import Education_Details from "./Education_Details"
import ProfessionalExperience from "./Professional-experience"
import SkillsAndProficiency from "./SkillsAndProficiency"
import PositionOfResponsibilities from "./PositionOfResponsibilities"
import ProjectsInput from "./Projects-input"
import AwardRecognition from "./AccomplishMents/AwardRecognition"
import AddCertification from "./AccomplishMents/AddCertification"
import { useState } from "react"
import AddCompetition from "./AccomplishMents/AddCompetition"
import AddConference from "./AccomplishMents/AddConference"
import MainFramer from "./FramesMotion/MainFramer"
import TestScores from "./AccomplishMents/TestScores"
import PatentData from "./AccomplishMents/PatentData"
import AddPublication from "./AccomplishMents/AddPublication"
import AddScholarship from "./AccomplishMents/AddScholarship"

export default function Page() {
  const [blury,setB]=useState(true);
  setTimeout(()=>{
    setB(false);
  },3000)
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar/>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Basic Details
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {blury? 
        // <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        //   <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        //     <div className="aspect-video rounded-xl bg-muted/50" />
        //     <div className="aspect-video rounded-xl bg-muted/50" />
        //     <div className="aspect-video rounded-xl bg-muted/50" />
        //   </div>
        //   <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        // </div>
        <MainFramer/> 
        :<>
        <AddPublication/>
        <AddScholarship/>
        <PatentData/>
        <TestScores/>
        <AddConference/>
        <AddCompetition/>
        <AddCertification/>
        <AwardRecognition/><ProjectsInput/>
        <PositionOfResponsibilities/>
        <Student_Details/>
        
        <Education_Details/>
        <ProfessionalExperience/>
        <SkillsAndProficiency/></>
        
}
        
      </SidebarInset>
    </SidebarProvider>
  )
}