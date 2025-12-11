import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import type {
  CreateReviewRequest,
  UpdateReviewRequest,
  Review,
} from "../../types/review";

interface ReviewFormProps {
  initialData?: Review; // 수정 모드일 때 초기 데이터
  onSubmit: (data: CreateReviewRequest | UpdateReviewRequest) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const FormContainer = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 200px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#ffa500" : "#ddd")};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

const TagInputContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const TagInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Tag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #1565c0;
  }
`;

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ImageInput = styled.input`
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ImageList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ImageItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #ddd;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5568d3;
    }
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `
      : `
    background: #f0f0f0;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
    
    &:disabled {
      background: #e0e0e0;
      color: #999;
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}
`;

const ReviewForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ReviewFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "food");
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [imageInput, setImageInput] = useState("");

  // 태그 추가 (최대 4개)
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 4) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  // 태그 입력에서 Enter 키 처리
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // 태그 제거
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 이미지 추가
  const handleAddImage = () => {
    const trimmedImage = imageInput.trim();
    if (trimmedImage && !images.includes(trimmedImage)) {
      setImages([...images, trimmedImage]);
      setImageInput("");
    }
  };

  // 이미지 입력에서 Enter 키 처리
  const handleImageInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddImage();
    }
  };

  // 이미지 제거
  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter((img) => img !== imageToRemove));
  };

  // 폼 제출
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      title: title.trim(),
      content: content.trim(),
      category,
      rating,
      images,
      tags,
    };

    await onSubmit(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label>제목 *</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="리뷰 제목을 입력하세요"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>카테고리 *</Label>
        <CategorySelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="food">🍔 음식</option>
          <option value="place">📍 장소</option>
          <option value="items">🛍️ 물건</option>
          <option value="clothing">👕 옷</option>
        </CategorySelect>
      </FormGroup>

      <FormGroup>
        <Label>평점 *</Label>
        <RatingContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarButton
              key={star}
              type="button"
              $active={star <= rating}
              onClick={() => setRating(star)}
            >
              ⭐
            </StarButton>
          ))}
          <span style={{ marginLeft: "8px", fontSize: "16px" }}>
            {rating}점
          </span>
        </RatingContainer>
      </FormGroup>

      <FormGroup>
        <Label>내용 *</Label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="리뷰 내용을 입력하세요"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>
          태그{" "}
          {tags.length > 0 && (
            <span
              style={{ fontSize: "14px", fontWeight: "normal", color: "#666" }}
            >
              ({tags.length}/4)
            </span>
          )}
        </Label>
        <TagInputContainer>
          <TagInput
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            placeholder={
              tags.length >= 4
                ? "태그는 최대 4개까지 추가할 수 있습니다"
                : "태그를 입력하고 Enter를 누르세요"
            }
            disabled={tags.length >= 4}
            style={{
              opacity: tags.length >= 4 ? 0.6 : 1,
              cursor: tags.length >= 4 ? "not-allowed" : "text",
            }}
          />
          <Button
            type="button"
            onClick={handleAddTag}
            $variant="secondary"
            disabled={tags.length >= 4}
          >
            추가
          </Button>
        </TagInputContainer>
        {tags.length > 0 && (
          <TagList>
            {tags.map((tag, index) => (
              <Tag key={index}>
                #{tag}
                <RemoveTagButton
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </RemoveTagButton>
              </Tag>
            ))}
          </TagList>
        )}
      </FormGroup>

      <FormGroup>
        <Label>이미지 URL</Label>
        <ImageInputContainer>
          <ImageInputContainer>
            <ImageInput
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyDown={handleImageInputKeyDown}
              placeholder="이미지 URL을 입력하세요"
            />
            <Button type="button" onClick={handleAddImage} $variant="secondary">
              이미지 추가
            </Button>
          </ImageInputContainer>
          {images.length > 0 && (
            <ImageList>
              {images.map((image, index) => (
                <ImageItem key={index}>
                  <ImagePreview src={image} alt={`이미지 ${index + 1}`} />
                  <RemoveImageButton
                    type="button"
                    onClick={() => handleRemoveImage(image)}
                  >
                    ×
                  </RemoveImageButton>
                </ImageItem>
              ))}
            </ImageList>
          )}
        </ImageInputContainer>
      </FormGroup>

      <ButtonContainer>
        {onCancel && (
          <Button type="button" onClick={onCancel} $variant="secondary">
            취소
          </Button>
        )}
        <Button type="submit" $variant="primary" disabled={isLoading}>
          {isLoading ? "저장 중..." : initialData ? "수정하기" : "작성하기"}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default ReviewForm;
