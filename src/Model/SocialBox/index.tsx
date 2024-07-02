/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react/jsx-runtime"
import Box from "../Boxs"
import { Auth } from "../../Api"

type initialSocials = 'Linkedin' | 'Instagram' | 'Facebook' | 'Twitter/ X' | 'Youtube' | 'Telegram'

class Social {
    public order:number = -1
    constructor(protected type:initialSocials,public value:string){

    }

    public resolveSign() {
        if(this.type == 'Instagram'){
            return 'Username'
        }
        return 'URL'
    }
    public getType() {
        return this.type
    }
    public miniIconUrl() {
        switch(this.type) {
            case 'Facebook': return 'devicon_facebook.svg'
            case 'Instagram': return 'devicon_instagram.svg'
            case 'Linkedin' : return 'devicon_linkdin.svg'
            case 'Twitter/ X': return 'devicon_twitter.svg'
            case 'Youtube': return 'devicon_youtube.svg'
            case 'Telegram': return 'devicon_telegram.svg'
        }
    }

    public standardIconUrl() {
        return ''
    }

    public resolveRender(theme:string,userID:string) {
        return (
            <div onClick={() => {
                Auth.addEvent({
                event_type:"link_click",
                userid:userID,
                sub_event_category:'view_link'
                })                
                window.open(this.value)
            }} className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector ${theme}-Profile-${this.resolveClassVectorName()}`}></div>
            </div>            
        )
    }

    public resolveUrl() {
        return this.value
    }

    private resolveClassVectorName() {
        switch (this.type){
            case 'Facebook' : return 'faceBookVector'
            case 'Instagram' : return 'InstagramVector'
            case 'Linkedin' : return 'LinkedinVector'
            case 'Twitter/ X' : return 'tweeterVector'
            case 'Youtube' : return 'youtubeVector'
            case 'Telegram' : return 'telegramVector'
        }
    }
}

class SocialBox extends Box{
    constructor(protected title:string,protected socialMedias:Array<Social>){
        super(title)
        this.order = 2
        this.type_name = 'SocialBox'
    }
    public isShareAble(): boolean {
        if(this.socialMedias.length == 0) {
            return false
        }else{
            return true
        }
    }    
    public resolveRender(theme: string,mode?:string,options?:any): JSX.Element {
        return (
            <>
                {
                    this.socialMedias.length > 0 ?
                        <div className={`${theme}-Profile-Vectors`}>
                            {this.socialMedias.sort((a,b) => a.order -b.order).map((item) => {
                                const newSocal = Object.assign(new Social('Facebook',''),item)
                                return (
                                    <>
                                        {newSocal.resolveRender(theme,options.userId)}
                                    </>
                                )
                            })}
                        </div>            
                    :
                        this.resolveAddRender(theme,mode)
                }
            </>
        )
    }
    public getRouteAddress(): string {
        return 'socials'
    }
    public getSocialMedias() {
        return this.socialMedias
    }
}

export {
    SocialBox,
    Social,
}
export type {
    initialSocials
}