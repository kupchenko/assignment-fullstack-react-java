import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {useState} from "react";

type CommentInputProps = {
  onSubmitComment: (text: string) => void
}

export const CommentInput = ({onSubmitComment}: CommentInputProps) => {
  const [text, setText] = useState<string>('');

  function submit() {
    onSubmitComment(text)
    setText('')
  }

  return (
    <div className="flex flex-col gap-1 w-full pt-5">
      <TextArea placeholder="Enter you comment" value={text} rows={4} onChange={(e) => setText(e.target.value)}/>
      <Button className="ml-auto" onClick={submit}>Post comment</Button>
    </div>
  )
}