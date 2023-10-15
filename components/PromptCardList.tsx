import { Post, PostWithUser } from "@/types/global";
import PromptCard from "./PromptCard";

type Props = {
  data: PostWithUser[];
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: PostWithUser) => void;
  handleDelete?: (post: PostWithUser) => void;
};

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }: Props) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post: PostWithUser) => (
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
