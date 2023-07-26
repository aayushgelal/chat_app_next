
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
export type {NavItemProps,MusicGenreProps}