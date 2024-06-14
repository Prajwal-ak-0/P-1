import * as React from "react";

import { cn } from "@/lib/utils";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";
import { Hint } from "./Hint";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputSection = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex h-16 rounded-full bg-background text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 items-center justify-center outline shadow-lg">
        <input
          type={type}
          className={cn(
            "flex h-16 w-[90%] rounded-full bg-background text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 px-4 outline-none",
            className
          )}
          placeholder="Type a message..."
          ref={ref}
          {...props}
        />
        <Hint label="Upload File" side="bottom" align="center">
          <div className="px-3 cursor-pointer" >
            <GrAttachment size={25} />
          </div>
        </Hint>
        <Hint label="Submit" side="bottom" align="center">
          <div className="px-3 cursor-pointer">
            <LuSendHorizonal size={25} />
          </div>
        </Hint>
      </div>
    );
  }
);
InputSection.displayName = "Input";

export { InputSection };
