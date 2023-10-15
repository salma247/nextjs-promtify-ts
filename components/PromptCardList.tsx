import { Post } from "@/types/global";
import PromptCard from "./PromptCard";

type Props = {
  data: Post[];
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
};

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }: Props) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post: Post) => (
        <PromptCard
          key={post._id}
          post={post}
          {...{ handleTagClick, handleEdit, handleDelete }}
         
        />
      ))}
    </div>
  );
};

export default PromptCardList;
