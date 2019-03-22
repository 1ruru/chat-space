require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe "#index" do
    context "log in" do
      before do
        login user
        get :index, params: {group_id: group.id}
      end
      it "アクション内で定義している@messageがあるか"do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it "アクション内で定義している@groupがあるか" do
        expect(assigns(:group)).to eq group
      end
      it "該当するビュー index が描画されているか" do
        expect(response).to render_template :index
      end
    end
    context "not log in" do
      before do
        get :index, params: {group_id: group.id}
      end
      it "該当するビュー new_user_session_path が描画されているか" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe "#create" do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    context "log in" do
      before do
        login user
      end
      context "メッセージを保存できた" do
        subject { post :create, params: params }
        it "メッセージを保存できたのか" do
          expect{subject}.to  change(Message, :count).by(1)
        end
        it "意図した画面 group_messages_path に遷移しているか" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
      context "メッセージを保存できなかった" do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }
        subject { post :create, params: invalid_params }
        it "メッセージを保存できなかったのか" do
          expect{subject}.not_to change(Message, :count)
        end
        it "意図した画面 index に遷移しているか" do
          subject
          expect(response).to render_template :index
        end
      end
    end
    context "not log in" do
      before do
        get :create, params: params
      end
      it "該当するビュー new_user_session_path が描画されているか" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
  
end
