require 'rails_helper'
describe Message do
  describe "#create" do
    context 'can save' do
      it "メッセージがあれば保存できる" do
        expect(build(:message, image: nil)).to be_valid
      end
      it "画像があれば保存できる" do
        expect(build(:message, body: nil)).to be_valid
      end
      it "メッセージと画像があれば保存できる" do
        expect(build(:message)).to be_valid
      end
    end
    context "cant save" do
      it 'メッセージも画像も無いと保存できない' do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end
      it 'group_idが無いと保存できない' do
        message = build(:message, group: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      it 'メッセージも画像も無いと保存できない' do
        message = build(:message, user: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
    
  end
end
