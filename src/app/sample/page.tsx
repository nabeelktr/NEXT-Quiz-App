export default function sample({searchParams}:any){

    return(
        <>
        <p>score : {searchParams.score}</p>
        <p>total score : {searchParams.total}</p>
        <p>difficulty : {searchParams.difficulty}</p>

        
        </>
    )
}