import FeatureComp from '../../../components/dashboard/Feature';
import DailyPHoc from '../../../components/dashboard/participations/Dailyhoc';

export default async function DashBoardPage () {

    return (
        <section className="pt-1 px-4 w-full flex justify-center items-center">
            <div className="md:min-w-[500px] min-h-[80vh] flex justify-start items-center  md:items-start flex-col md:flex-row md:gap-x-10 pt-1 px-4">
            <DailyPHoc />
            <FeatureComp />
            </div>
        </section>
    )
}