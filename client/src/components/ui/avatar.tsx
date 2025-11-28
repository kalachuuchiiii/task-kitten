
import avatarPlaceholder from '/avatar-placeholder.png';

export const Avatar = ({ size, src }:{size:number, src: string | undefined}) => {


    return (
      <div
        className={`w-${size} h-${size} outline-3 outline-offset-2 outline-indigo-600   rounded aspect-square overflow-hidden`}
      >
        <img
          src={src || avatarPlaceholder}
          className="w-full bg-black h-full object-cover"
        />
      </div>
    );
}