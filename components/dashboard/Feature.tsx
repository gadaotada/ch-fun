import Image from "next/image";

import { getActiveFeature } from "../../lib/database/data/actions-get";

const FeatureComp = async () => {

    const feature = await getActiveFeature();
    
    if(feature && feature['daily_feature'].length > 0) {
        return (
            <div className="mt-3">
                <h1 className="text-center font-bold mb-2 text-3xl">Daily MEME</h1>
                <Image 
                    src={`${feature['daily_feature']}`}
                    width={300}
                    height={300}
                    alt='Feature meme'
                />
            </div>
        )
    }

};

export default FeatureComp