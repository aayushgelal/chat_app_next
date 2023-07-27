
interface NavItemProps{
    name?:String;
    link:String;
    icon?:React.FC<any>;
    size?:any;



};

interface MusicGenreProps{
    name?:String;
    link:String;
    color: string;
    


}
interface State{
    user:String |null,
    token:String|null
}

export type {State,NavItemProps,MusicGenreProps}