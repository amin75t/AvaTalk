class Box {
    protected static boxCounter:number = 0
    protected typeName:'Box'|'SocialBox'|'LinkBox'|'AboutBox'|'GalleryBox'|'GoogleMapBox' = 'Box'
    protected order:number = -1;
    constructor(protected title:string){}
    
    protected assignOrder() {
        this.order = Box.boxCounter ++
    }
    public getTitle() {
        return this.title
    }

    public getOrder() {
        return this.order
    }

    public getTypeName() {
        return this.typeName
    }

    public getEventName() {
        switch(this.typeName){
            case 'AboutBox' :return 'more_info_about'
            case 'GalleryBox': return 'more_info_gallery'
            case 'SocialBox': return 'more_info_socials'
            case 'LinkBox': return 'more_info_links'
        }
    }

    public getRouteAddress() {
        return ''
    }

    public resolveRender(theme:string,mode?:string) {
        return (
            <>
                <div className={theme} data-mode={mode}></div>
            </>
        )
    }

    protected resolveAddRender(theme:string,mode?:string) {
        return (
            <>
                {mode == 'profile' ?
                <div className={`${theme}-Profile-BackgroundVectors`}>
                    <div className="w-10 h-10 flex justify-center items-center bg-gray-100  rounded-full boxShadow-mini-Gray">
                        <img src="./Carbon/fi-rr-add.svg" alt="" />
                    </div>
                </div>            
                :
                undefined
                }
            </>
        )
    }
}

export default Box